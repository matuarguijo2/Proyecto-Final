export const metadata = {
  title: "Preguntas frecuentes | Gota de Sangre",
  description: "Preguntas frecuentes sobre donación de sangre, cáncer de sangre y Gota de Sangre.",
};

const faqs = [
  {
    category: "Cáncer de sangre",
    items: [
      {
        question: "¿Qué es el cáncer de sangre?",
        answer:
          "El cáncer de sangre afecta la producción y función de las células sanguíneas. La mayoría comienza en la médula ósea, donde se produce la sangre. Los tipos más conocidos son la leucemia, el linfoma y el mieloma.",
      },
      {
        question: "¿Qué es la leucemia?",
        answer:
          "La leucemia es un tipo de cáncer que afecta a la sangre y la médula ósea. Se produce por la creación rápida y anormal de glóbulos blancos, que no pueden combatir infecciones y dificultan que la médula produzca glóbulos rojos y plaquetas correctamente.",
      },
      {
        question: "¿Qué es el linfoma?",
        answer:
          "El linfoma es un cáncer del sistema linfático (ganglios linfáticos, bazo, timo, médula ósea). Puede manifestarse con ganglios inflamados, fiebre, sudores nocturnos y cansancio. La donación de sangre y de células madre puede ser parte del tratamiento.",
      },
      {
        question: "¿Cómo ayuda la donación de sangre a pacientes con cáncer de sangre?",
        answer:
          "Los pacientes con leucemia, linfoma u otros cánceres hematológicos suelen necesitar transfusiones de glóbulos rojos y plaquetas durante el tratamiento (quimioterapia, radioterapia). Cada donación puede ayudar a salvar o sostener vidas.",
      },
    ],
  },
  {
    category: "Donación de sangre",
    items: [
      {
        question: "¿Quién puede donar sangre?",
        answer:
          "En general, personas entre 18 y 65 años (según normativa local), con buen estado de salud, peso mínimo aproximado de 50 kg y sin enfermedades que contraindiquen la donación. Se requiere presentar documento de identidad y cumplir con una breve evaluación médica.",
      },
      {
        question: "¿Cada cuánto se puede donar sangre?",
        answer:
          "Los hombres pueden donar sangre entera cada 3 meses y las mujeres cada 4 meses, aproximadamente. En donación por aféresis (solo plaquetas o plasma) los intervalos pueden ser menores; el centro de donación te indicará los plazos.",
      },
      {
        question: "¿Duele donar sangre?",
        answer:
          "Se siente un pinchazo breve al insertar la aguja. Durante la donación no suele haber dolor. Después puedes tener una pequeña molestia o moretón en el brazo, que desaparece en pocos días.",
      },
      {
        question: "¿Es seguro donar sangre?",
        answer:
          "Sí. Se usa material estéril y de un solo uso. El volumen que se extrae es seguro para un adulto sano y el cuerpo lo repone en poco tiempo. Antes de donar se hace una evaluación para asegurar que no haya riesgo para el donante.",
      },
      {
        question: "¿Qué requisitos debo cumplir el día de la donación?",
        answer:
          "Haber descansado bien, desayunar o almorzar de forma habitual (evitar ayuno), estar hidratado y no haber tomado alcohol en las últimas horas. Si tienes dudas sobre medicación o enfermedades, consulta en el centro de donación.",
      },
      {
        question: "¿Qué son las plaquetas y por qué son importantes?",
        answer:
          "Las plaquetas son células que ayudan a la coagulación. Los pacientes con cáncer de sangre suelen tener bajos niveles de plaquetas por la enfermedad o el tratamiento, y necesitan transfusiones para reducir el riesgo de sangrado. Se pueden donar plaquetas por aféresis.",
      },
    ],
  },
  {
    category: "Gota de Sangre y campañas",
    items: [
      {
        question: "¿Qué es Gota de Sangre?",
        answer:
          "Gota de Sangre es una iniciativa que conecta a donantes con pacientes que necesitan sangre, especialmente en el contexto del cáncer de sangre. Promovemos la donación y las campañas para apoyar a pacientes y familias.",
      },
      {
        question: "¿Cómo puedo crear o apoyar una campaña de donación?",
        answer:
          "Puedes crear una campaña desde la sección «Involúcrate» si representas a un paciente o institución. También puedes sumarte como donante inscribiéndote en campañas existentes o registrándote como donante en la plataforma.",
      },
    ],
  },
];

export default function PreguntasFrecuentesPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
      <h1 className="mb-2 text-[2.5rem] text-primary">Preguntas frecuentes</h1>
      <p className="mb-10 text-lg text-gray-600">
        Respuestas a dudas habituales sobre cáncer de sangre, donación de sangre y Gota de Sangre.
      </p>

      <div className="space-y-12">
        {faqs.map((section) => (
          <section key={section.category}>
            <h2 className="mb-6 border-b border-gray-200 pb-2 text-xl font-bold text-gray-900">
              {section.category}
            </h2>
            <ul className="list-none space-y-6 p-0">
              {section.items.map((faq, index) => (
                <li
                  key={index}
                  className="rounded-xl border border-gray-200 bg-gray-50/80 p-5 transition hover:border-gray-300 hover:bg-gray-50"
                >
                  <h3 className="mb-2 font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
