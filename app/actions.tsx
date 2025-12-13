// src/app/actions.ts (or src/app/actions.js)

"use server"; // IMPORTANT: This directive marks ALL functions in this file as Server Actions

import { revalidatePath } from "next/cache";

// This function will run securely on the server
export async function submitManuscript(formData: FormData) {
  // 1. Get data from the form
  const paperTitle = formData.get("paperTitle");
  const authors = formData.get("authors");
  const researchPaperFile = formData.get("researchPaperFile") as File | null;

  // 2. Perform Server-side Logic (Validation, Database Save, File Storage)
  if (!paperTitle || !authors || !researchPaperFile) {
    console.error("Missing required fields!");
    return { success: false, message: "Missing fields" };
  }

  // --- File Upload Logic (Example) ---
  if (researchPaperFile) {
    // In a real application, you would save this file to AWS S3, Google Cloud Storage, etc.
    console.log(
      `Processing file: ${researchPaperFile.name}, size: ${researchPaperFile.size} bytes`
    );
    // Simulating a delay for processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  // 3. Update the UI (Optional)
  // revalidatePath('/current-edition'); // Tells Next.js to regenerate the archives page if submission was successful

  console.log(`Manuscript Submitted: ${paperTitle} by ${authors}`);

  return { success: true, message: "Manuscript submitted successfully!" };
}

export async function submitRegistrationPayment(formData: FormData) {
  // 1. EXTRACT DATA
  const paymentSlipFile = formData.get("paymentSlip") as File | null;
  const paperReference = formData.get("paperReference") as string;
  const transactionRef = formData.get("transactionRef") as string;
  const payerName = formData.get("payerName") as string;

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
