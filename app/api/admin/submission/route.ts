// app/api/admin/submissions/route.ts
import { NextResponse } from "next/server";
// 🎯 Replace with your actual Prisma client import
// import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  // 1. Authorization: Verify Admin/Editor Role
  // 🎯 INTEGRATION POINT: Check the session user's role against the database.
  // if (!await isAdminOrEditor()) {
  //     return NextResponse.json({ message: "Access Denied" }, { status: 403 });
  // }

  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get("status") || undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;

  try {
    // 2. Prisma Query
    // MOCK: Replace with actual Prisma query
    /*
        const submissions = await prisma.submission.findMany({
            where: { status: statusFilter },
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: { correspondingAuthor: true }, // Include author details
            orderBy: { createdAt: 'desc' },
        });

        const totalCount = await prisma.submission.count({
            where: { status: statusFilter },
        });
        */

    // Mock Data Structure based on Schema
    const submissions = [
      {
        id: 1,
        submissionRef: "IJASSW-26-001",
        title: "The Impact of AI on Global Social Work",
        status: "In Review",
        createdAt: new Date(),
        correspondingAuthor: { name: "Dr. Jane Smith" },
      },
      {
        id: 2,
        submissionRef: "IJASSW-26-002",
        title: "Economic Policy in Post-Pandemic Asia",
        status: "Awaiting Decision",
        createdAt: new Date(),
        correspondingAuthor: { name: "Prof. Lee Wei" },
      },
    ];
    const totalCount = 42;

    return NextResponse.json({
      data: submissions,
      total: totalCount,
      page: page,
      totalPages: Math.ceil(totalCount / pageSize),
    });
  } catch (error) {
    console.error("API Error fetching submissions:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
