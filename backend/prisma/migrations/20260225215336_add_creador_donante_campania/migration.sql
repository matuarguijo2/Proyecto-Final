-- AlterTable
ALTER TABLE "public"."Campania" ADD COLUMN     "creadorDonanteId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Campania" ADD CONSTRAINT "Campania_creadorDonanteId_fkey" FOREIGN KEY ("creadorDonanteId") REFERENCES "public"."Donante"("id") ON DELETE SET NULL ON UPDATE CASCADE;
