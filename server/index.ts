import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Authentication Routes
app.post('/api/auth/login', async (req, res) => {
  const { email, password, userType } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const expectedAdminPassword = process.env.ADMIN_PASSWORD || 'securepassword';

  try {
    if (userType === 'admin') {
      const dbUser = await prisma.user.findFirst({
        where: { email, role: 'admin' },
      });

      const isValid =
        (dbUser && dbUser.password === password) ||
        (email.trim().toLowerCase() === 'admin@wakajes.com' && password === expectedAdminPassword) ||
        (email.trim().toLowerCase() === 'wakajes1986@gmail.com' && password === expectedAdminPassword);

      if (isValid) {
        res.cookie('admin_session', 'authenticated', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.json({ success: true, redirectTo: '/dashboard' });
      }

      return res.status(401).json({ success: false, message: 'Invalid credentials for Admin access.' });
    } else {
      const authorUser = await prisma.user.findFirst({ where: { email } });
      const isValid =
        (authorUser && authorUser.password === password) ||
        (email === 'author@wakajes.com' && password === 'test');

      if (isValid) {
        res.cookie('author_session', email, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.json({ success: true, redirectTo: '/paper-submission' });
      }

      return res.status(401).json({ success: false, message: 'Invalid credentials for Author/Reviewer.' });
    }
  } catch (error) {
    console.error('Login error:', error);
    if (
      userType === 'admin' &&
      (email.trim().toLowerCase() === 'admin@wakajes.com' || email.trim().toLowerCase() === 'wakajes1986@gmail.com') &&
      password === expectedAdminPassword
    ) {
      res.cookie('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({ success: true, redirectTo: '/dashboard' });
    }
    return res.status(500).json({ success: false, message: 'Authentication service error.' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('admin_session');
  res.clearCookie('author_session');
  return res.json({ success: true, redirectTo: '/login' });
});

app.get('/api/auth/session', (req, res) => {
  const isAdmin = req.cookies.admin_session === 'authenticated';
  const authorEmail = req.cookies.author_session;
  return res.json({ isAdmin, authorEmail: authorEmail || null });
});

// Manuscript Submission
app.post('/api/submissions', async (req, res) => {
  const { paperTitle, authors, email, abstract, mobileNumber, manuscriptUrl, manuscriptPublicId } = req.body;

  if (!paperTitle || !authors || !email || !abstract || !manuscriptUrl) {
    return res.status(400).json({
      success: false,
      message: 'Missing required submission details. Please complete all required fields.',
    });
  }

  try {
    const refCode = `WAKAJES-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSubmission = await prisma.submission.create({
      data: {
        title: paperTitle,
        authors,
        email,
        abstract,
        phone: mobileNumber || null,
        manuscriptUrl,
        manuscriptPublicId: manuscriptPublicId || '',
        status: 'New Submission',
        paperReferenceNumber: refCode,
      },
    });

    return res.json({
      success: true,
      message: `Manuscript **${newSubmission.title}** submitted successfully to WAKAJES!`,
      data: {
        id: newSubmission.id,
        paperReference: refCode,
        paperTitle: newSubmission.title,
      },
    });
  } catch (error) {
    console.error('Submission DB error:', error);
    return res.status(500).json({
      success: false,
      message: 'Submission failed due to a server error. Please try again.',
    });
  }
});

// Registration Payment Verification
app.post('/api/registration/payment', async (req, res) => {
  const { paperReference, transactionRef, payerName } = req.body;

  if (!paperReference || !transactionRef || !payerName) {
    return res.status(400).json({ success: false, message: 'Missing required verification fields.' });
  }

  try {
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        OR: [{ id: paperReference }, { paperReferenceNumber: paperReference }],
      },
    });

    if (existingSubmission) {
      await prisma.submission.update({
        where: { id: existingSubmission.id },
        data: {
          payerName,
          bankTransactionRef: transactionRef,
          paymentStatus: 'Pending Verification',
        },
      });
    } else {
      await prisma.submission.create({
        data: {
          title: `Submission for Ref ${paperReference}`,
          authors: payerName,
          email: 'pending@wakajes.com',
          abstract: 'Registration Payment Submitted',
          manuscriptUrl: '',
          manuscriptPublicId: '',
          paperReferenceNumber: paperReference,
          payerName,
          bankTransactionRef: transactionRef,
          paymentStatus: 'Pending Verification',
        },
      });
    }

    return res.json({
      success: true,
      message: 'Payment verification submitted! An admin will review and confirm your ₦10,000 vetting fee shortly.',
    });
  } catch (error) {
    console.error('Payment registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error recording transaction verification. Please try again.',
    });
  }
});

// Contact Message
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    return res.json({
      success: true,
      message: 'Your message has been sent to the WAKAJES Editorial Office successfully.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'There was an error sending your message. Please try again.',
    });
  }
});

// Admin Submissions list
app.get('/api/admin/submissions', async (req, res) => {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ success: true, submissions });
  } catch (error) {
    console.error('Fetch admin submissions error:', error);
    return res.json({ success: true, submissions: [] });
  }
});

export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[WAKAJES API Server] Running on http://localhost:${PORT}`);
  });
}

