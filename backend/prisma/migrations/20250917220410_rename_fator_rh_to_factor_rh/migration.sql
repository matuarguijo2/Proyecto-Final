/*
  Warnings:

  - Changed the type of `factor_rh` on the `Donante` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."FactorRH" AS ENUM ('positivo', 'negativo');

-- AlterTable
ALTER TABLE "public"."Donante" DROP COLUMN "factor_rh",
ADD COLUMN     "factor_rh" "public"."FactorRH" NOT NULL;

-- DropEnum
DROP TYPE "public"."FatorRH";
