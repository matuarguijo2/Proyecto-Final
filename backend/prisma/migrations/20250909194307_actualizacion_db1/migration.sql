/*
  Warnings:

  - You are about to drop the column `numero` on the `Hospital` table. All the data in the column will be lost.
  - You are about to alter the column `telefono` on the `Hospital` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."Hospital" DROP COLUMN "numero",
ALTER COLUMN "telefono" SET DATA TYPE INTEGER;
