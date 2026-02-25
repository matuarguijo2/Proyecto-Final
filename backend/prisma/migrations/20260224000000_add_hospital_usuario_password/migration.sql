-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN IF NOT EXISTS "usuario" TEXT;
ALTER TABLE "Hospital" ADD COLUMN IF NOT EXISTS "password" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Hospital_usuario_key" ON "Hospital"("usuario");
