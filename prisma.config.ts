// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});

// import { PrismaClientOptions } from "@prisma/client";

// const config: PrismaClientOptions = {
//   // 1. Configuration for Prisma Migrate (Direct connection)
//   // We use the standard POSTGRES_URL here for direct database operations.
//   migrate: {
//     url: process.env.POSTGRES_URL,
//   },

//   // 2. Configuration for the Prisma Client (Runtime connection)
//   // We use the Accelerate URL here as it's designed for client runtime and pooling.
//   client: {
//     accelerateUrl: process.env.PRISMA_DATABASE_URL,
//   },
// };

// export default config;
