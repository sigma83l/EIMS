-- DropForeignKey
ALTER TABLE "Coordinator" DROP CONSTRAINT "Coordinator_departmentId_fkey";

-- AlterTable
ALTER TABLE "Coordinator" ALTER COLUMN "departmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Coordinator" ADD CONSTRAINT "Coordinator_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
