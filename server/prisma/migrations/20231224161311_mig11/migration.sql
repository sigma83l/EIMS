/*
  Warnings:

  - You are about to drop the column `isVerified` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "isVerified",
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;
