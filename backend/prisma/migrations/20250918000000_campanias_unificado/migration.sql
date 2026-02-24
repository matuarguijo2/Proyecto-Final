-- AlterTable: hacer hospitalId y ubicacion opcionales para campañas de organizadores
ALTER TABLE "Campania" ALTER COLUMN "hospitalId" DROP NOT NULL;
ALTER TABLE "Campania" ALTER COLUMN "ubicacion" DROP NOT NULL;
ALTER TABLE "Campania" ALTER COLUMN "fecha_inicio" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Campania" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Nuevos campos para campañas creadas por organizadores (formulario público)
ALTER TABLE "Campania" ADD COLUMN "nombreApellidoReceptor" TEXT;
ALTER TABLE "Campania" ADD COLUMN "dniReceptor" TEXT;
ALTER TABLE "Campania" ADD COLUMN "grupoSanguineoRh" TEXT;
ALTER TABLE "Campania" ADD COLUMN "cantidadDadores" TEXT;
ALTER TABLE "Campania" ADD COLUMN "nombreCentro" TEXT;
ALTER TABLE "Campania" ADD COLUMN "direccionCompleta" TEXT;
ALTER TABLE "Campania" ADD COLUMN "horariosDias" TEXT;
ALTER TABLE "Campania" ADD COLUMN "telefonoEmailOrganizador" TEXT;
