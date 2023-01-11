/*
  Warnings:

  - A unique constraint covering the columns `[alias,kind,gender]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Pet_alias_key";

-- CreateIndex
CREATE UNIQUE INDEX "Pet_alias_kind_gender_key" ON "Pet"("alias", "kind", "gender");
