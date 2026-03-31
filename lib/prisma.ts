import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const isBuild = process.env.NEXT_PHASE === 'phase-production-build';

export const prisma =
  globalForPrisma.prisma ??
  (isBuild
    ? ({} as PrismaClient)
    : new PrismaClient())

if (process.env.NODE_ENV !== 'production' && !isBuild) {
  globalForPrisma.prisma = prisma
}
