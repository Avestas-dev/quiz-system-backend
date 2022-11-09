/*
  Warnings:

  - Added the required column `blockedTo` to the `BlockedUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlockedUser" ADD COLUMN     "blockedTo" TIMESTAMP(3) NOT NULL;
