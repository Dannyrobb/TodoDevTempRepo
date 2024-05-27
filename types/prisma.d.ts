import { PrismaClient } from "@prisma/client";

declare module "../db/prisma" {
  const prisma: PrismaClient;
  export default prisma;
}
