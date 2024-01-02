/*
  Warnings:

  - A unique constraint covering the columns `[applicationId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `days` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "days" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "applicationId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_applicationId_key" ON "Image"("applicationId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
