/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // 🎯 Ensure you have your Prisma client configured here
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Missing name, email, or password." },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Check if ANY user exists (to enforce Admin-Only registration)
    const userCount = await prisma.user.count();

    if (userCount > 0) {
      // After initial setup, registration should be locked down or handled by an authenticated Admin
      return NextResponse.json(
        {
          message:
            "User registration is currently closed. Only existing Admins can create new user accounts.",
        },
        { status: 403 }
      );
    }

    // 2. Initial Setup: Create the first user and assign the Admin role
    const newUser = await prisma.$transaction(async (tx) => {
      // Find the Admin Role ID (Must be seeded first!)
      const adminRole = await tx.role.findUnique({ where: { name: "Admin" } });

      if (!adminRole) {
        throw new Error(
          "Admin role not found in database. Please run Prisma seed."
        );
      }

      // Create the User
      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash: hashedPassword,
        },
      });

      // Assign the Admin Role
      await tx.userRole.create({
        data: {
          userId: user.id,
          roleId: adminRole.id,
        },
      });

      return user;
    });

    // 3. Return success (without the password hash)
    return NextResponse.json(
      {
        success: true,
        userId: newUser.id,
        message: "Initial Admin account created successfully.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      // Handle unique constraint violation (email already exists)
      return NextResponse.json(
        { message: "A user with this email already exists." },
        { status: 409 }
      );
    }
    console.error("Error during Admin registration:", error);
    return NextResponse.json(
      { message: "Failed to create user account" },
      { status: 500 }
    );
  }
}
