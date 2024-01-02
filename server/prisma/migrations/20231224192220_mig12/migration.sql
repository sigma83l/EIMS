/*
  Warnings:

  - You are about to drop the column `department` on the `Coordinator` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[departmentId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departmentId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coordinator" DROP COLUMN "department";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "departmentId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DepartmenT" (
    "id" SERIAL NOT NULL,
    "name" "Department" NOT NULL,
    "coordinatorId" INTEGER NOT NULL,

    CONSTRAINT "DepartmenT_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DepartmenT_coordinatorId_key" ON "DepartmenT"("coordinatorId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_departmentId_key" ON "Student"("departmentId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "DepartmenT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmenT" ADD CONSTRAINT "DepartmenT_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "Coordinator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
