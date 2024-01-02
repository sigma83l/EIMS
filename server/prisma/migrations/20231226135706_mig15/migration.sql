/*
  Warnings:

  - Added the required column `coordinatorId` to the `Superviser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Superviser" ADD COLUMN     "coordinatorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Superviser" ADD CONSTRAINT "Superviser_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "Coordinator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
