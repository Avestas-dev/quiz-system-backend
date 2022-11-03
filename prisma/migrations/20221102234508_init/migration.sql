/*
  Warnings:

  - You are about to drop the column `trainingId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_trainingId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "trainingId";
