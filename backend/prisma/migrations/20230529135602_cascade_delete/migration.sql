-- DropForeignKey
ALTER TABLE "Goods" DROP CONSTRAINT "Goods_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ReceptionRecord" DROP CONSTRAINT "ReceptionRecord_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ReceptionRecord" DROP CONSTRAINT "ReceptionRecord_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "ReceptionRecord" DROP CONSTRAINT "ReceptionRecord_receptionPurposeId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_typeId_fkey";

-- AddForeignKey
ALTER TABLE "Goods" ADD CONSTRAINT "Goods_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GoodsCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ServiceType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceptionRecord" ADD CONSTRAINT "ReceptionRecord_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceptionRecord" ADD CONSTRAINT "ReceptionRecord_receptionPurposeId_fkey" FOREIGN KEY ("receptionPurposeId") REFERENCES "ReceptionPurpose"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceptionRecord" ADD CONSTRAINT "ReceptionRecord_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
