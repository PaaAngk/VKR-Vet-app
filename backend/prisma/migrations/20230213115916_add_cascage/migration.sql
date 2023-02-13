-- DropForeignKey
ALTER TABLE "AnalyzesResearch" DROP CONSTRAINT "AnalyzesResearch_petId_fkey";

-- DropForeignKey
ALTER TABLE "GoodsList" DROP CONSTRAINT "GoodsList_goodsId_fkey";

-- DropForeignKey
ALTER TABLE "GoodsList" DROP CONSTRAINT "GoodsList_receptionId_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Reception" DROP CONSTRAINT "Reception_petId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceList" DROP CONSTRAINT "ServiceList_receptionId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceList" DROP CONSTRAINT "ServiceList_serviceId_fkey";

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalyzesResearch" ADD CONSTRAINT "AnalyzesResearch_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsList" ADD CONSTRAINT "GoodsList_receptionId_fkey" FOREIGN KEY ("receptionId") REFERENCES "Reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsList" ADD CONSTRAINT "GoodsList_goodsId_fkey" FOREIGN KEY ("goodsId") REFERENCES "Goods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceList" ADD CONSTRAINT "ServiceList_receptionId_fkey" FOREIGN KEY ("receptionId") REFERENCES "Reception"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceList" ADD CONSTRAINT "ServiceList_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
