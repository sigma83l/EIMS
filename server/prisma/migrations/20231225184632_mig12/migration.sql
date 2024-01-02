/*
  Warnings:

  - You are about to drop the column `coordinatorId` on the `DepartmenT` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[departmentId]` on the table `Coordinator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departmentId` to the `Coordinator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DepartmenT" DROP CONSTRAINT "DepartmenT_coordinatorId_fkey";

-- DropIndex
DROP INDEX "DepartmenT_coordinatorId_key";

-- AlterTable
ALTER TABLE "Coordinator" ADD COLUMN     "departmentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DepartmenT" DROP COLUMN "coordinatorId";

-- CreateIndex
CREATE UNIQUE INDEX "Coordinator_departmentId_key" ON "Coordinator"("departmentId");

-- AddForeignKey
ALTER TABLE "Coordinator" ADD CONSTRAINT "Coordinator_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "DepartmenT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
