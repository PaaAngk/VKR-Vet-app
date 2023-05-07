/*
  Warnings:

  - You are about to drop the column `dataTimeEnd` on the `ReceptionRecord` table. All the data in the column will be lost.
  - You are about to drop the column `dataTimeStart` on the `ReceptionRecord` table. All the data in the column will be lost.
  - Added the required column `dateTimeEnd` to the `ReceptionRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateTimeStart` to the `ReceptionRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReceptionRecord" DROP COLUMN "dataTimeEnd",
DROP COLUMN "dataTimeStart",
ADD COLUMN     "dateTimeEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateTimeStart" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "data" SET DATA TYPE DATE;
