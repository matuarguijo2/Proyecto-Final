export default function PostDonacion() {
  return (
    <main>
      <section className="mx-auto max-w-[1200px] px-8 py-16">
        <h1 className="mb-6 text-[2.5rem] text-primary">
          Qué hacer después de la donación
        </h1>
        
        <p className="mb-8 text-lg leading-relaxed text-gray-500">
          ¡Gracias por tu generosidad! Tu donación puede salvar hasta tres vidas. Para asegurar tu bienestar y una 
          rápida recuperación, te recomendamos seguir estos cuidados durante las próximas horas.
        </p>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl text-primary">Inmediatamente después</h2>
            <ul className="list-disc pl-6 leading-relaxed">
              <li className="mb-2">Descansa en el área de refrigerio por al menos 15 minutos.</li>
              <li className="mb-2">Toma el refrigerio y la bebida que te ofrecemos para reponer líquidos y azúcar.</li>
              <li className="mb-2">Mantén el vendaje en el brazo durante las próximas 4 horas.</li>
              <li className="mb-2">Si sientes mareos, acuéstate o siéntate con la cabeza entre las rodillas hasta que pase.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl text-brand-green-dark">Durante el resto del día</h2>
            <ul className="list-disc pl-6 leading-relaxed">
              <li className="mb-2">Bebe más líquidos de lo habitual (agua, jugos) durante las siguientes 24 horas.</li>
              <li className="mb-2">Evita levantar objetos pesados o realizar ejercicios vigorosos por hoy.</li>
              <li className="mb-2">No consumas bebidas alcohólicas hasta haber comido bien y recuperado líquidos.</li>
              <li className="mb-2">Evita fumar por al menos 2 horas después de donar.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-xl bg-[#ffebee] p-8">
          <h2 className="mb-4 text-[1.8rem] text-brand-red-dark">¿Cuándo contactarnos?</h2>
          <p className="text-lg leading-relaxed">
            Aunque es poco común, pueden presentarse algunas reacciones. Contáctanos o acude al médico si:
          </p>
          <ul className="mt-4 list-[circle] pl-8 leading-relaxed">
            <li>Sientes mareos persistentes o desmayos después de haber descansado.</li>
            <li>Observas un hematoma grande, dolor o hinchazón en el sitio de la punción.</li>
            <li>Presentas fiebre o síntomas de enfermedad en los días siguientes a la donación (es importante para la seguridad de la sangre).</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
