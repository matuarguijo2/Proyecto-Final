-- CreateTable
CREATE TABLE "public"."InscripcionCampania" (
    "id" SERIAL NOT NULL,
    "campaniaId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InscripcionCampania_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InscripcionCampania_campaniaId_email_key" ON "public"."InscripcionCampania"("campaniaId", "email");

-- AddForeignKey
ALTER TABLE "public"."InscripcionCampania" ADD CONSTRAINT "InscripcionCampania_campaniaId_fkey" FOREIGN KEY ("campaniaId") REFERENCES "public"."Campania"("id") ON DELETE CASCADE ON UPDATE CASCADE;
