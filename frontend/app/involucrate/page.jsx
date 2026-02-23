import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });

export const metadata = {
  title: "Involúcrate",
  description: "Involúcrate - Formas de ayudar, ser donante y crear campañas de donación",
};

export default function InvolucratePage() {
  return (
    <main>
      <div className="mx-auto max-w-[1200px] px-8 py-8">
        <p className="mb-6 text-lg text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, culpa?
        </p>

        <section className="mb-16 rounded-xl border border-gray-200 bg-gray-50/50 p-8 shadow-sm">
          <h2 className="mb-4 text-[2rem] text-primary">
            Campañas de donación
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            Las campañas de donación de sangre permiten concentrar donantes en un lugar y fecha para ayudar a pacientes que necesitan transfusiones o componentes sanguíneos. Si un familiar o conocido requiere donantes (por grupo y factor RH), puedes organizar una campaña indicando el centro de salud donde se puede donar, los horarios y la fecha límite. Así más personas pueden sumarse y donar de forma coordinada.
          </p>
          <ul className="mb-8 list-disc pl-6 text-gray-700">
            <li>Indica los datos del paciente receptor y el tipo de sangre necesario.</li>
            <li>Selecciona el hospital, clínica o centro de hemoterapia donde se puede donar.</li>
            <li>Comparte la campaña para que los donantes compatibles se acerquen en el horario indicado.</li>
          </ul>
          <Link
            href="/involucrate/crear-campana"
            className={`${poppins.className} inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-base font-extrabold text-white no-underline shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all duration-[120ms] hover:-translate-y-0.5 hover:opacity-95`}
          >
            Crea Tu Campaña
          </Link>
        </section>
      </div>
    </main>
  );
}
