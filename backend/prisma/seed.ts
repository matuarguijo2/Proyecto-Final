import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const centrosTucuman = [
  {
    nombre: "Banco Central de Sangre de Tucumán",
    direccion: "Av. Mitre 236, San Miguel de Tucumán",
    telefono: 4311234,
    email: "bancosangre@tucuman.gob.ar",
    tipo: "Publico" as const,
    horario_atencion: "Lunes a Viernes 7:00 - 13:00",
    isActive: true,
    latitude: -26.8294,
    longitude: -65.2036,
  },
  {
    nombre: "Hospital Centro de Salud - Unidad de Hemoterapia",
    direccion: "Av. Avellaneda 750, San Miguel de Tucumán",
    telefono: 4245678,
    email: "hemoterapia.centro@tucuman.gob.ar",
    tipo: "Publico" as const,
    horario_atencion: "Lunes 8:00 - 12:00",
    isActive: true,
    latitude: -26.8321,
    longitude: -65.2089,
  },
  {
    nombre: "Hospital Padilla",
    direccion: "Av. Benjamín Aráoz 750, San Miguel de Tucumán",
    telefono: 4314567,
    email: "contacto@hospitalpadilla.gob.ar",
    tipo: "Publico" as const,
    horario_atencion: "Lunes a Viernes 8:00 - 14:00",
    isActive: true,
    latitude: -26.829,
    longitude: -65.206,
  },
  {
    nombre: "Hospital del Niño Jesús",
    direccion: "Av. Belgrano 1700, San Miguel de Tucumán",
    telefono: 4521234,
    email: "donacion@niniojesus.gob.ar",
    tipo: "Publico" as const,
    horario_atencion: "Lunes a Viernes 8:00 - 12:00",
    isActive: true,
    latitude: -26.832,
    longitude: -65.212,
  },
  {
    nombre: "Hospital Nicolás Avellaneda",
    direccion: "Av. Francisco de Aguirre 250, San Miguel de Tucumán",
    telefono: 4345678,
    email: "hemoterapia@hospitalavellaneda.gob.ar",
    tipo: "Publico" as const,
    horario_atencion: "Lunes a Viernes 7:30 - 12:30",
    isActive: true,
    latitude: -26.8275,
    longitude: -65.1998,
  },
  {
    nombre: "Sanatorio 9 de Julio",
    direccion: "Av. 9 de Julio 156, San Miguel de Tucumán",
    telefono: 4223344,
    email: "donantes@sanatorio9dejulio.com.ar",
    tipo: "Privado" as const,
    horario_atencion: "Lunes a Viernes 8:00 - 16:00",
    isActive: true,
    latitude: -26.8302,
    longitude: -65.2045,
  },
  {
    nombre: "Instituto de Maternidad y Ginecología Nuestra Sra. de las Mercedes",
    direccion: "Av. Belgrano 1562, San Miguel de Tucumán",
    telefono: 4317890,
    email: "banco.sangre@maternidadtucuman.gob.ar",
    tipo: "Publico" as const,
    horario_atencion: "Lunes a Viernes 8:00 - 12:00",
    isActive: true,
    latitude: -26.8312,
    longitude: -65.2105,
  },
  {
    nombre: "Hospital de Clínicas - UNT",
    direccion: "Av. Benjamín Aráoz 800, San Miguel de Tucumán",
    telefono: 4248901,
    email: "hemoterapia@hospitalclinicas.unt.edu.ar",
    tipo: "Publico" as const,
    horario_atencion: "Lunes a Viernes 8:00 - 13:00",
    isActive: true,
    latitude: -26.8288,
    longitude: -65.2052,
  },
];

async function main() {
  const count = await prisma.hospital.count();
  if (count > 0) {
    console.log("Ya existen centros en la base de datos. Omitiendo seed.");
    return;
  }
  await prisma.hospital.createMany({ data: centrosTucuman });
  console.log(`Seed completado: ${centrosTucuman.length} centros de atención en Tucumán.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
