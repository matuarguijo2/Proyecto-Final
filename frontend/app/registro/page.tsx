import Link from "next/link";

export const metadata = {
  title: "Registro | Gota de Sangre",
  description: "Regístrate como donante o como hospital.",
};

export default function RegistroPage() {
  return (
    <main className="min-h-[60vh] px-4 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="mb-2 text-3xl font-bold text-primary">Regístrate</h1>
        <p className="mb-10 text-gray-600">Elegí cómo querés participar.</p>
        <div className="grid gap-4">
          <Link
            href="/registro/donante"
            className="flex flex-col items-center rounded-xl border-2 border-primary bg-white p-8 text-center no-underline shadow-sm transition hover:bg-red-50"
          >
            <span className="mb-2 text-4xl" aria-hidden>🩸</span>
            <span className="text-xl font-semibold text-primary">Usuario/Donante</span>
            <span className="mt-1 text-sm text-gray-600">
              Iniciá sesión o creá tu cuenta para donar sangre
            </span>
          </Link>
          <Link
            href="/registro/hospital"
            className="flex flex-col items-center rounded-xl border-2 border-primary bg-white p-8 text-center no-underline shadow-sm transition hover:bg-red-50"
          >
            <span className="mb-2 text-4xl" aria-hidden>🏥</span>
            <span className="text-xl font-semibold text-primary">Hospital</span>
            <span className="mt-1 text-sm text-gray-600">
              Iniciá sesión o registrá tu institución
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
