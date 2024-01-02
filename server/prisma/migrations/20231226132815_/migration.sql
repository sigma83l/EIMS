/*
  Warnings:

  - A unique constraint covering the columns `[cassessmentId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sassessmentId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdAt` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cassessmentId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sassessmentId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Scores" AS ENUM ('POOR', 'FAIR', 'GOOD', 'EXCELLENT');

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "size" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "cassessmentId" INTEGER NOT NULL,
ADD COLUMN     "sassessmentId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CoordinatorAssessment" (
    "id" SERIAL NOT NULL,
    "qualityOfStudentInternshipReport" "Scores" NOT NULL DEFAULT 'GOOD',
    "experienceGained" "Scores" NOT NULL DEFAULT 'GOOD',
    "presentation" "Scores" NOT NULL DEFAULT 'GOOD',
    "visualPresentationAid" "Scores" NOT NULL DEFAULT 'GOOD',
    "overalAssessmentResult" "Scores" NOT NULL DEFAULT 'GOOD',
    "studentId" INTEGER NOT NULL,
    "coordinatorId" INTEGER NOT NULL,

    CONSTRAINT "CoordinatorAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuperviserAssessment" (
    "id" SERIAL NOT NULL,
    "qualityOfStudentInternshipReport" "Scores" NOT NULL DEFAULT 'GOOD',
    "experienceGained" "Scores" NOT NULL DEFAULT 'GOOD',
    "presentation" "Scores" NOT NULL DEFAULT 'GOOD',
    "visualPresentationAid" "Scores" NOT NULL DEFAULT 'GOOD',
    "overalAssessmentResult" "Scores" NOT NULL DEFAULT 'GOOD',
    "studentId" INTEGER NOT NULL,
    "superviserId" INTEGER NOT NULL,

    CONSTRAINT "SuperviserAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoordinatorAssessment_studentId_key" ON "CoordinatorAssessment"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "CoordinatorAssessment_coordinatorId_key" ON "CoordinatorAssessment"("coordinatorId");

-- CreateIndex
CREATE UNIQUE INDEX "SuperviserAssessment_studentId_key" ON "SuperviserAssessment"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "SuperviserAssessment_superviserId_key" ON "SuperviserAssessment"("superviserId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_cassessmentId_key" ON "Student"("cassessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_sassessmentId_key" ON "Student"("sassessmentId");

-- AddForeignKey
ALTER TABLE "CoordinatorAssessment" ADD CONSTRAINT "CoordinatorAssessment_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "Coordinator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuperviserAssessment" ADD CONSTRAINT "SuperviserAssessment_superviserId_fkey" FOREIGN KEY ("superviserId") REFERENCES "Superviser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_cassessmentId_fkey" FOREIGN KEY ("cassessmentId") REFERENCES "CoordinatorAssessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_sassessmentId_fkey" FOREIGN KEY ("sassessmentId") REFERENCES "SuperviserAssessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
