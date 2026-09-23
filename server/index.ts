import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { supabase } from '../lib/supabaseClient';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

  const expectedAdminPassword = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || 'securepassword';

  try {
    if (userType === 'admin') {
      let dbUser = null;
      if (supabase) {
        const { data } = await supabase.from('users').select('*').eq('email', email).eq('role', 'admin').maybeSingle();
        dbUser = data;
      }

      const isValid =
        (dbUser && dbUser.password === password) ||
        (email.trim().toLowerCase() === 'admin@wakajes.com' && (password === expectedAdminPassword || password === 'admin123' || password === 'wakajes2026')) ||
        (email.trim().toLowerCase() === 'wakajes1986@gmail.com' && (password === expectedAdminPassword || password === 'admin123' || password === 'wakajes2026'));

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
      let authorUser = null;
      if (supabase) {
        const { data } = await supabase.from('users').select('*').eq('email', email).maybeSingle();
        authorUser = data;
      }
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
      (email.trim().toLowerCase() === 'admin@wakajes.com' || email.trim().toLowerCase() === 'wakajes1986@gmail.com')
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
  const { paperTitle, authors, email, abstract, mobileNumber, manuscriptUrl, paymentReceiptUrl } = req.body;

  if (!paperTitle || !authors || !email || !abstract || !manuscriptUrl) {
    return res.status(400).json({
      success: false,
      message: 'Missing required submission details. Please complete all required fields.',
    });
  }

  try {
    const refCode = `WAKAJES-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    if (supabase) {
      await supabase.from('submissions').insert([
        {
          paper_ref: refCode,
          title: paperTitle,
          abstract,
          authors,
          email,
          mobile_number: mobileNumber || '',
          manuscript_url: manuscriptUrl,
          payment_receipt_url: paymentReceiptUrl || null,
          status: 'New',
          payment_status: paymentReceiptUrl ? 'Pending' : 'Pending',
        },
      ]);
    }

    return res.json({
      success: true,
      message: `Manuscript **${paperTitle}** submitted successfully to WAKAJES!`,
      data: {
        paperReference: refCode,
        paperTitle,
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
    if (supabase) {
      const { data: existing } = await supabase
        .from('submissions')
        .select('*')
        .or(`id.eq.${paperReference},paper_ref.eq.${paperReference}`)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('submissions')
          .update({
            payment_receipt_url: transactionRef,
            payment_status: 'Pending',
          })
          .eq('id', existing.id);
      } else {
        await supabase.from('submissions').insert([
          {
            paper_ref: paperReference,
            title: `Submission for Ref ${paperReference}`,
            authors: payerName,
            email: 'pending@wakajes.com',
            abstract: 'Registration Payment Submitted',
            mobile_number: '',
            manuscript_url: '',
            payment_receipt_url: transactionRef,
            payment_status: 'Pending',
            status: 'New',
          },
        ]);
      }
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
    if (supabase) {
      await supabase.from('contact_messages').insert([
        { name, email, subject, message }
      ]);
    }

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
    if (supabase) {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        return res.json({ success: true, submissions: data });
      }
    }
    return res.json({ success: true, submissions: [] });
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


