/*
  Warnings:

  - Added the required column `estado` to the `Campania` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario_atencion` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TipoHospital" AS ENUM ('Publico', 'Privado');

-- CreateEnum
CREATE TYPE "public"."EstadoCampania" AS ENUM ('Activa', 'Finalizada', 'Cancelada');

-- AlterTable
ALTER TABLE "public"."Campania" ADD COLUMN     "estado" "public"."EstadoCampania" NOT NULL,
ADD COLUMN     "imagen_url" TEXT;

-- AlterTable
ALTER TABLE "public"."Donacion" ADD COLUMN     "observaciones" TEXT;

-- AlterTable
ALTER TABLE "public"."Hospital" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "horario_atencion" TEXT NOT NULL,
ADD COLUMN     "tipo" "public"."TipoHospital" NOT NULL;
