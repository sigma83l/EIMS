/*
  Warnings:

  - You are about to drop the column `url` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Resume` table. All the data in the column will be lost.
  - Added the required column `name` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "url",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "url",
ADD COLUMN     "name" TEXT NOT NULL;
