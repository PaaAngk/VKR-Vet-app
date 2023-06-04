/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,name,measure]` on the table `Goods` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Goods_categoryId_name_measure_key" ON "Goods"("categoryId", "name", "measure");
