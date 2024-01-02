/*
  Warnings:

  - You are about to drop the column `isVerified` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "isVerified",
DROP COLUMN "type";
