-- CreateTable
CREATE TABLE "public"."Donante" (
    "id" SERIAL NOT NULL,
    "dni" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Donante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Hospital" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "telefono" BIGINT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Donacion" (
    "id" SERIAL NOT NULL,
    "DonanteId" INTEGER NOT NULL,

    CONSTRAINT "Donacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donante_dni_key" ON "public"."Donante"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Donante_email_key" ON "public"."Donante"("email");

-- AddForeignKey
ALTER TABLE "public"."Donacion" ADD CONSTRAINT "Donacion_DonanteId_fkey" FOREIGN KEY ("DonanteId") REFERENCES "public"."Donante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
