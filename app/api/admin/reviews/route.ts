// app/api/admin/reviews/route.ts
import { NextResponse } from "next/server";
// 🎯 Replace with your actual Prisma client import
// import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  // 1. Authorization: Verify Admin/Editor Role
  // if (!await isAdminOrEditor()) {
  //     return NextResponse.json({ message: "Access Denied" }, { status: 403 });
  // }

  const { submissionId, reviewerId, dueDate, editorId } = await request.json();

  if (!submissionId || !reviewerId || !dueDate) {
    return NextResponse.json(
      { message: "Missing submission, reviewer, or due date." },
      { status: 400 }
    );
  }

  try {
    // 2. Prisma Transaction: Create Assignment
    // MOCK: Replace with actual Prisma query
    /*
        const newAssignment = await prisma.reviewAssignment.create({
            data: {
                submissionId: submissionId,
                reviewerId: reviewerId,
                dueDate: new Date(dueDate),
                status: 'Pending',
                // Log the editor who assigned it (optional tracking)
            },
        });
        
        // 3. Update Submission Status (e.g., to "In Review")
        await prisma.submission.update({
             where: { id: submissionId },
             data: { status: 'In Review' },
        });
        */

    console.log(
      `[API]: Assignment created for Sub: ${submissionId} to Reviewer: ${reviewerId}`
    );

    return NextResponse.json(
      {
        success: true,
        message: "Reviewer assigned successfully.",
        assignmentId: 999,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle unique constraint errors (e.g., reviewer already assigned)
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Reviewer is already assigned to this submission." },
        { status: 409 }
      );
    }
    console.error("Error creating assignment:", error);
    return NextResponse.json(
      { message: "Failed to create assignment" },
      { status: 500 }
    );
  }
}
