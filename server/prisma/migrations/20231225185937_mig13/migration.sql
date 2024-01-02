/*
  Warnings:

  - Changed the type of `name` on the `DepartmenT` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DepartmentNames" AS ENUM ('DEPARTMENT1', 'DEPARTMENT2', 'DEPARTMENT3');

-- AlterTable
ALTER TABLE "DepartmenT" DROP COLUMN "name",
ADD COLUMN     "name" "DepartmentNames" NOT NULL;

-- DropEnum
DROP TYPE "Department";
