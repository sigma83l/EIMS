/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Coordinator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Superviser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Superviser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coordinator" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Superviser" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Coordinator_email_key" ON "Coordinator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Superviser_email_key" ON "Superviser"("email");
