/*
  Warnings:

  - You are about to drop the column `rol` on the `Donante` table. All the data in the column will be lost.
  - Added the required column `fecha_donacion` to the `Donacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_donacion` to the `Donacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factor_rh` to the `Donante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_nacimiento` to the `Donante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grupo_sanguineo` to the `Donante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `Donante` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."GrupoSanguineo" AS ENUM ('A', 'B', 'AB', 'O');

-- CreateEnum
CREATE TYPE "public"."FatorRH" AS ENUM ('positivo', 'negativo');

-- CreateEnum
CREATE TYPE "public"."TipoDonacion" AS ENUM ('sangre_completa', 'plasma', 'plaqueta');

-- CreateEnum
CREATE TYPE "public"."EstadoDonacion" AS ENUM ('exitosa', 'rechazada', 'pendiente');

-- CreateEnum
CREATE TYPE "public"."EstadoDonante" AS ENUM ('activo', 'inactivo', 'suspendido');

-- CreateEnum
CREATE TYPE "public"."Sexo" AS ENUM ('Masculino', 'Femenino');

-- AlterTable
ALTER TABLE "public"."Donacion" ADD COLUMN     "campaniaId" INTEGER,
ADD COLUMN     "estado" "public"."EstadoDonacion" NOT NULL DEFAULT 'pendiente',
ADD COLUMN     "fecha_donacion" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hospitalId" INTEGER,
ADD COLUMN     "tipo_donacion" "public"."TipoDonacion" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Donante" DROP COLUMN "rol",
ADD COLUMN     "estado" "public"."EstadoDonante" NOT NULL DEFAULT 'activo',
ADD COLUMN     "factor_rh" "public"."FatorRH" NOT NULL,
ADD COLUMN     "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fecha_ultima_donacion" TIMESTAMP(3),
ADD COLUMN     "grupo_sanguineo" "public"."GrupoSanguineo" NOT NULL,
ADD COLUMN     "sexo" "public"."Sexo" NOT NULL;

-- CreateTable
CREATE TABLE "public"."Campania" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3),
    "ubicacion" TEXT NOT NULL,
    "hospitalId" INTEGER NOT NULL,

    CONSTRAINT "Campania_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Campania" ADD CONSTRAINT "Campania_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "public"."Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Donacion" ADD CONSTRAINT "Donacion_campaniaId_fkey" FOREIGN KEY ("campaniaId") REFERENCES "public"."Campania"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Donacion" ADD CONSTRAINT "Donacion_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "public"."Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;
