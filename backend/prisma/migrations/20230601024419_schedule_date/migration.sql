/*
  Warnings:

  - You are about to drop the column `data` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `date` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Client_id_key";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "data",
ADD COLUMN     "date" DATE NOT NULL;
