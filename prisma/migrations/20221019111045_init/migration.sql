-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordResetDate" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT;
