-- CreateEnum
CREATE TYPE "TagStatus" AS ENUM ('pending', 'rejected', 'accepted');

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "tagStatus" "TagStatus" NOT NULL DEFAULT 'pending';
