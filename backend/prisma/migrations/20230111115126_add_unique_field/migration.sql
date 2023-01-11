/*
  Warnings:

  - A unique constraint covering the columns `[fullName]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[alias]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,typeId]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[typeName]` on the table `TypeAnalyzesResearch` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employee_fullName_key" ON "Employee"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_alias_key" ON "Pet"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_typeId_key" ON "Service"("name", "typeId");

-- CreateIndex
CREATE UNIQUE INDEX "TypeAnalyzesResearch_typeName_key" ON "TypeAnalyzesResearch"("typeName");
