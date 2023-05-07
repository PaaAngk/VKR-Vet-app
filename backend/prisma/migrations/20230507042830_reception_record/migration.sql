/*
  Warnings:

  - The primary key for the `ReceptionRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dataTime` on the `ReceptionRecord` table. All the data in the column will be lost.
  - The `id` column on the `ReceptionRecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `dataTimeEnd` to the `ReceptionRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataTimeStart` to the `ReceptionRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReceptionRecord" DROP CONSTRAINT "ReceptionRecord_pkey",
DROP COLUMN "dataTime",
ADD COLUMN     "dataTimeEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataTimeStart" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ReceptionRecord_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id");
