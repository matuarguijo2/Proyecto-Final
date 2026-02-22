export default function TiempoDonacion() {
  return (
    <main>
      <section className="mx-auto max-w-[1200px] px-8 py-16">
        <h1 className="mb-6 text-[2.5rem] text-primary">
          ¿Cuánto tiempo tarda la donación?
        </h1>
        
        <p className="mb-8 text-xl leading-relaxed text-gray-700">
          El proceso completo de donación de sangre suele tomar entre <strong>45 y 60 minutos</strong>. 
          Sin embargo, este tiempo puede variar considerablemente dependiendo de cada situación individual.
        </p>

        <div className="mb-12 flex flex-col gap-8">
          <div className="flex items-start gap-6">
            <div className="flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
              1
            </div>
            <div>
              <h3 className="mb-2 text-2xl">Registro y Entrevista (15 - 20 min)</h3>
              <p>Llenarás un formulario con tus datos y pasarás a una entrevista privada con un profesional de la salud para asegurar que donar sea seguro para ti y para el paciente que recibirá tu sangre.</p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
              2
            </div>
            <div>
              <h3 className="mb-2 text-2xl">La Donación (10 - 15 min)</h3>
              <p>La extracción de sangre en sí misma es rápida. Te reclinarás cómodamente mientras se recolecta una unidad de sangre (450 ml aprox.).</p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
              3
            </div>
            <div>
              <h3 className="mb-2 text-2xl">Refrigerio y Descanso (15 min)</h3>
              <p>Después de donar, pasarás al área de descanso donde tomarás una bebida y un snack. Es vital que permanezcas aquí unos minutos para asegurar que te sientes bien antes de irte.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-l-8 border-brand-blue bg-[#e3f2fd] p-10">
          <h2 className="mb-4 text-[1.8rem] text-brand-blue-dark">La salud es lo que determina el tiempo</h2>
          <p className="mb-4 text-lg leading-relaxed">
            Es posible que en algunas ocasiones el proceso tome un poco más de tiempo. Esto se debe a que <strong>nuestra prioridad absoluta es la seguridad</strong>, tanto tuya como donante, como la de los pacientes que recibirán la transfusión.
          </p>
          <p className="text-lg leading-relaxed">
            Cada paso, desde la revisión de tus niveles de hemoglobina hasta la verificación de tus signos vitales, se realiza con minuciosa atención. Si el personal médico necesita más tiempo para evaluar tu historial o verificar tu estado de salud actual, lo haremos sin prisa. 
            <strong>Unos minutos extra pueden significar la diferencia entre una donación segura y efectiva, y una complicación evitable.</strong> Tu paciencia es parte de tu regalo de vida.
          </p>
        </div>
      </section>
    </main>
  );
}
