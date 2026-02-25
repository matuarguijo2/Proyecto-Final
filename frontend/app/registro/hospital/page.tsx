import Link from "next/link";

export const metadata = {
  title: "Institución | Gota de Sangre",
  description: "Iniciá sesión o registrá tu institución.",
};

export default function RegistroHospitalPage() {
  return (
    <main className="min-h-[60vh] px-4 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="mb-2 text-3xl font-bold text-primary">Institución</h1>
        <p className="mb-10 text-gray-600">
          Iniciá sesión con tu cuenta de institución o registrá tu institución.
        </p>
        <div className="grid gap-4">
          <Link
            href="/registro/hospital/login"
            className="flex flex-col items-center rounded-xl border-2 border-primary bg-white p-8 text-center no-underline shadow-sm transition hover:bg-red-50"
          >
            <span className="mb-2 text-4xl" aria-hidden>🔐</span>
            <span className="text-xl font-semibold text-primary">Iniciar sesión</span>
            <span className="mt-1 text-sm text-gray-600">
              Ingresá con tu nombre de usuario y contraseña
            </span>
          </Link>
          <Link
            href="/registro/hospital/crear"
            className="flex flex-col items-center rounded-xl border-2 border-primary bg-white p-8 text-center no-underline shadow-sm transition hover:bg-red-50"
          >
            <span className="mb-2 text-4xl" aria-hidden>🏥</span>
            <span className="text-xl font-semibold text-primary">Registrar institución</span>
            <span className="mt-1 text-sm text-gray-600">
              Creá la cuenta de tu institución
            </span>
          </Link>
        </div>
        <p className="mt-8 text-center">
          <Link href="/registro" className="text-primary no-underline hover:underline">
            ← Volver a Registro
          </Link>
        </p>
      </div>
    </main>
  );
}
