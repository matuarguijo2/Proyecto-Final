import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });

export const metadata = {
  title: "Involúcrate",
  description: "Involúcrate - Formas de ayudar, ser donante y crear campañas de donación",
};

export default function InvolucratePage() {
  return (
    <main className="min-h-[60vh] px-4 py-12">
      <div className="mx-auto max-w-[800px]">
        <h1 className="mb-2 text-3xl font-bold text-primary">Involúcrate</h1>

        <section className="mb-10 rounded-xl border border-gray-200 bg-gray-50/60 p-6 text-gray-700 md:p-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            ¿Por qué sumarte?
          </h2>
          <p className="mb-4 leading-relaxed">
            Donar sangre es uno de los gestos más solidarios que podés tener. Con una sola donación podés ayudar hasta a tres personas: tu sangre se separa en glóbulos rojos, plaquetas y plasma, que salvan vidas en cirugías, tratamientos oncológicos, accidentes y enfermedades graves. Sin donantes voluntarios, muchas personas no tendrían una segunda oportunidad.
          </p>
          <p className="mb-4 leading-relaxed">
            La donación es segura, lleva poco tiempo y no duele. Cada unidad que donás puede significar la diferencia entre la vida y la muerte para alguien que hoy está esperando una transfusión. En Gota de Sangre trabajamos para conectar a quienes quieren donar con quienes más lo necesitan.
          </p>
          <p className="leading-relaxed">
            Involucrarte puede ser donando, registrándote como donante, difundiendo la causa o organizando campañas. Tu compromiso ayuda a que más pacientes con cáncer de sangre y otras enfermedades reciban la ayuda que necesitan. Cada persona que se suma cuenta.
          </p>
        </section>

        <p className="mb-8 text-gray-600">Elegí una opción para continuar.</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/"
            className="flex flex-col items-center rounded-xl border-2 border-primary bg-white p-8 text-center no-underline shadow-sm transition hover:bg-red-50"
          >
            <svg
              className="mb-3 h-12 w-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xl font-semibold text-primary">Volver al inicio</span>
            <span className="mt-1 text-sm text-gray-600">
              Regresar a la página principal de Gota de Sangre
            </span>
          </Link>
          <Link
            href="/registro"
            className={`${poppins.className} flex flex-col items-center rounded-xl border-2 border-primary bg-white p-8 text-center no-underline shadow-sm transition hover:bg-red-50`}
          >
            <svg
              className="mb-3 h-12 w-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <span className="text-xl font-semibold text-primary">Registrarse</span>
            <span className="mt-1 text-sm text-gray-600">
              Creá tu cuenta como donante o accedé si ya tenés una
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
