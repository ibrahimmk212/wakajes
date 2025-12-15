// src/app/actions.ts (or src/app/actions.js)

"use server"; // IMPORTANT: This directive marks ALL functions in this file as Server Actions

import { revalidatePath } from "next/cache";

interface ActionResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    paperReference: string;
    paperTitle: string;
  };
}

// ... (rest of the file remains the same until the success block) ...

export async function submitManuscript(
  formData: FormData
): Promise<ActionResponse> {
  // 1. Extract Data and Assert Types
  // Ensure the names match the 'name' attributes in your SubmissionForm.tsx
  const paperTitle = formData.get("paperTitle") as string;
  const authors = formData.get("authors") as string;
  const email = formData.get("email") as string;
  const abstract = formData.get("abstract") as string;
  const mobileNumber = formData.get("mobileNumber") as string | null;

  // File references from the hidden inputs updated by the FileUploader/Cloudinary Widget
  const manuscriptUrl = formData.get("manuscriptUrl") as string;
  const manuscriptPublicId = formData.get("manuscriptPublicId") as string;

  // 2. Comprehensive Validation
  if (
    !paperTitle ||
    !authors ||
    !email ||
    !abstract ||
    !manuscriptUrl ||
    !manuscriptPublicId
  ) {
    return {
      success: false,
      message:
        "Missing required submission details. Please ensure all text fields are filled and the manuscript file is successfully uploaded.",
    };
  }

  // Basic email format check (optional, but recommended)
  if (!email.includes("@") || !email.includes(".")) {
    return {
      success: false,
      message:
        "The email address provided is invalid. Please enter a correct email.",
    };
  }

  try {
    // 3. Database Transaction: Create the new Submission record
    const newSubmission = await prisma.submission.create({
      data: {
        title: paperTitle,
        authorsList: authors,
        correspondingAuthorEmail: email,
        abstract: abstract,
        mobileNumber: mobileNumber,

        // Save the essential file references
        manuscriptUrl: manuscriptUrl,
        manuscriptPublicId: manuscriptPublicId,

        status: "New Submission", // Initial workflow status
      },
    });

    // 4. Generate Reference and Log Success
    const paperReference = newSubmission.id.substring(0, 8).toUpperCase();

    console.log(`[DB SUCCESS] Manuscript submitted. ID: ${newSubmission.id}`);

    // Return success message with data payload
    return {
      success: true,
      message: `Manuscript **${newSubmission.title}** submitted successfully!`,
      data: {
        id: newSubmission.id,
        paperReference: paperReference,
        paperTitle: newSubmission.title,
      },
    };
  } catch (error) {
    console.error("PRISMA/DB Error during submission:", error);

    // Return generic server error message
    return {
      success: false,
      message: `Submission failed due to a server error. Please try again. If the issue persists, contact support.`,
    };
  }
}

export async function submitRegistrationPayment(formData: FormData) {
  // 1. EXTRACT DATA
  const paymentSlipFile = formData.get("paymentSlip") as File | null;
  const paperReference = formData.get("paperReference") as string;
  const transactionRef = formData.get("transactionRef") as string;
  const payerName = formData.get("payerName") as string;

  console.log({ paymentSlipFile, paperReference, transactionRef, payerName });

  // 2. VALIDATION
  if (!paymentSlipFile || !paperReference || !transactionRef || !payerName) {
    return { success: false, message: "Missing required verification fields." };
  }

  // 3. FILE STORAGE (CRUCIAL)
  try {
    const fileBytes = await paymentSlipFile.arrayBuffer();
    const buffer = Buffer.from(fileBytes);

    // 🎯 INTEGRATION POINT:
    // Securely upload the 'buffer' to a cloud service (e.g., AWS S3, Vercel Blob)
    // const fileUrl = await uploadService.upload(buffer, paymentSlipFile.name);

    console.log(`Successfully prepared payment slip: ${paymentSlipFile.name}`);

    // 4. DATABASE INSERTION (Placeholder)
    // Save the transaction details and the file URL to a database for admin review.
    /*
    await db.payments.create({ 
      data: { 
        paperId: paperReference, 
        transactionRef: transactionRef,
        payerName: payerName,
        status: 'Pending Verification', 
        fileUrl: fileUrl 
      } 
    });
    */
  } catch (error) {
    console.error("Payment slip upload failed:", error);
    return {
      success: false,
      message: "Error processing the payment slip upload.",
    };
  }

  revalidatePath("/registration-status"); // Optionally revalidate a status page

  return {
    success: true,
    message:
      "Verification submitted! An admin will review and confirm your payment shortly.",
  };
}

export async function sendContactMessage(formData: FormData) {
  // 1. Extract Data
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // 2. Simple Validation
  if (!name || !email || !subject || !message) {
    return { success: false, message: "All fields are required." };
  }

  try {
    // 🎯 INTEGRATION POINT:
    // This is where you would integrate with your email service provider (e.g., Nodemailer, Resend, or SendGrid API).
    /* await emailService.send({
      to: 'editor@ijassw.com',
      from: 'website@ijassw.com',
      subject: `[Website Contact - ${subject}] from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });
    */

    console.log(`Contact message received from ${name}. Subject: ${subject}`);

    return {
      success: true,
      message:
        "Your message has been sent successfully! We will respond within 48 hours.",
    };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return {
      success: false,
      message:
        "There was an error sending your message. Please try again or email us directly.",
    };
  }
}

export async function logInUser(
  formData: FormData
): Promise<{ success: boolean; message?: string; redirectTo?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const userType = formData.get("userType") as string; // 'author' or 'admin'

  // 1. Basic Validation
  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  // 2. Database/Authentication Check (Placeholder)
  // 🎯 INTEGRATION POINT:
  // In a real application, you would:
  // a) Query the database for the user by email.
  // b) Hash the submitted password and compare it to the stored hash (e.g., using bcrypt).
  // c) If successful, create a secure session (e.g., using NextAuth or custom logic).

  if (userType === "admin") {
    if (email === "admin@ijassw.com" && password === "securepassword") {
      // 3. Admin Success (Create session, then redirect)
      console.log(`Admin login successful: ${email}`);
      // Set secure session cookie here...
      return { success: true, redirectTo: "/dashboard" };
    }
    return { success: false, message: "Invalid credentials for Admin access." };
  } else {
    // Author/Reviewer
    if (email === "author@test.com" && password === "test") {
      // 4. Author Success (Create session, then redirect)
      console.log(`Author login successful: ${email}`);
      // Set secure session cookie here...
      return { success: true, redirectTo: "/author-portal" }; // Assuming an author portal page
    }
    return {
      success: false,
      message: "Invalid credentials for Author/Reviewer.",
    };
  }
}

export async function updateSystemSettings(
  formData: FormData
): Promise<{ success: boolean; message?: string }> {
  // 1. Authorization Check (CRITICAL)
  // 🎯 INTEGRATION POINT: Check if the current session user has the 'Editorial Chief' or 'Super Admin' role.
  // if (!currentUserIsSuperAdmin()) {
  //   return { success: false, message: "Permission denied. Only Super Admins can modify system settings." };
  // }

  // 2. Extract and Validate Data
  const settingsToUpdate = {
    journalName: formData.get("journalName") as string,
    currentVolume: parseInt(formData.get("currentVolume") as string),
    apcAmountUSD: parseFloat(formData.get("apcAmountUSD") as string),
    reviewDaysMax: parseInt(formData.get("reviewDaysMax") as string),
    // ... extract other fields
  };

  if (!settingsToUpdate.journalName || isNaN(settingsToUpdate.currentVolume)) {
    return {
      success: false,
      message: "Invalid data provided for essential fields.",
    };
  }

  try {
    // 🎯 INTEGRATION POINT: Database Update
    // In a real application, you would:
    // a) Validate and sanitize all inputs.
    // b) Update a single 'settings' document/row in your database with the new values.

    console.log(`--- System Settings Update ---`);
    console.log(
      `New Volume/Issue: ${settingsToUpdate.currentVolume}/${formData.get(
        "currentIssue"
      )}`
    );
    console.log(
      `New APC: ${settingsToUpdate.apcAmountUSD} ${formData.get("apcCurrency")}`
    );
    console.log(`Updated by: [Logged-in Admin User ID]`);
    console.log(`-------------------------------`);

    // Simulate success
    return {
      success: true,
    };
  } catch (error) {
    console.error("System Settings update failed:", error);
    return {
      success: false,
      message: "An unexpected database error occurred during the update.",
    };
  }
}

import { v2 as cloudinary } from "cloudinary";
// NOTE: Make sure to configure Cloudinary using environment variables
// (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)

// --- Cloudinary Configuration (Should ideally be done once at initialization) ---
// If not configured via environment variables, do it here:
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// --- Helper function to convert File to a base64 Data URL for upload ---
async function bufferToDataUrl(file: File) {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);
  return `data:${file.type};base64,${bytes.toString("base64")}`;
}

export async function submitNewPaper(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  // ... (Data Extraction, Validation, etc.) ...
  const title = formData.get("title") as string;
  const fileEntry = formData.get("manuscript");

  if (!fileEntry || typeof fileEntry === "string") {
    return { success: false, message: "No manuscript file uploaded." };
  }

  const file = fileEntry as File;

  try {
    // 1. Convert file to data URL (required for some serverless uploads)
    const fileDataUrl = await bufferToDataUrl(file);

    // 2. 🎯 Upload File to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(fileDataUrl, {
      resource_type: "raw", // Important: Treat as a raw document (PDF, DOCX)
      folder: "ijassw/manuscripts", // Define a clear folder structure
      public_id: `${title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")}-${Date.now()}`,
      tags: ["submission"],
    });

    // 3. 🎯 Save Reference URL and Public ID to Database (using Prisma/PostgreSQL)
    const manuscriptUrl = uploadResult.secure_url;
    const manuscriptPublicId = uploadResult.public_id;

    // --- PRISMA/POSTGRESQL INTEGRATION POINT ---
    // Assuming you have a Submission model in your schema:
    /*
        const newSubmission = await prisma.submission.create({
            data: {
                title: title,
                // ... other fields from formData ...
                manuscriptUrl: manuscriptUrl,          // The direct link to the file
                manuscriptPublicId: manuscriptPublicId, // Cloudinary ID for management/deletion
                status: 'New',
                // Link author via relational IDs
            }
        });
        */
    // ---------------------------------------------

    console.log(`--- Cloudinary File Upload Success ---`);
    console.log(`URL: ${manuscriptUrl}`);
    console.log(`Public ID: ${manuscriptPublicId}`);
    console.log(`------------------------------------`);

    const paperRef = `IJASSW-2026-001`; // Should come from the newSubmission record ID

    return {
      success: true,
      message: `Manuscript submitted successfully! Your tracking reference is **${paperRef}**. A confirmation email has been sent.`,
    };
  } catch (error) {
    console.error("Cloudinary or Submission failed:", error);
    return {
      success: false,
      message:
        "An unexpected error occurred during file upload. Please ensure your manuscript is valid.",
    };
  }
}
