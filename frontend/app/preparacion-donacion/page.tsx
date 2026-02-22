export default function PreparacionDonacion() {
  return (
    <main>
      <section className="mx-auto max-w-[1200px] px-8 py-16">
        <h1 className="mb-6 text-[2.5rem] text-primary">
          Preparándose para donar
        </h1>
        <p className="mb-12 text-lg leading-relaxed text-gray-500">
          Donar sangre es un proceso seguro y sencillo. Aquí te explicamos paso a paso qué esperar para que te sientas cómodo y preparado.
        </p>

        <div className="mb-10">
          <h2 className="mb-4 inline-block border-b-2 border-primary pb-1.5 text-[1.8rem]">
            1. ¿Dónde y cuándo donar?
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            Puedes donar en nuestros centros fijos de donación o en las unidades móviles que visitan diferentes puntos de la ciudad.
          </p>
          <ul className="list-none p-0">
            <li className="mb-2 rounded-lg bg-gray-100 p-4">
              <strong>Centros Fijos:</strong> Disponibles de Lunes a Sábado de 7:00 AM a 5:00 PM. Ubicados en Hospital Central y Clínica Norte.
            </li>
            <li className="mb-2 rounded-lg bg-gray-100 p-4">
              <strong>Campañas Móviles:</strong> Consulta nuestro calendario mensual en la sección de &quot;Involúcrate&quot; para ver cuándo estaremos cerca de tu zona.
            </li>
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="mb-4 inline-block border-b-2 border-primary pb-1.5 text-[1.8rem]">
            2. Chequeo Médico Preliminar
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            Antes de la extracción, realizaremos una breve evaluación para garantizar tu seguridad y la del receptor. Este chequeo es gratuito y confidencial.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-2 text-xl font-semibold">Entrevista Privada</h3>
              <p>Un profesional de la salud te hará preguntas sobre tu historial médico y estilo de vida.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-2 text-xl font-semibold">Signos Vitales</h3>
              <p>Mediremos tu presión arterial, pulso y temperatura para asegurar que estás en condiciones óptimas.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-2 text-xl font-semibold">Prueba de Hierro</h3>
              <p>Con un leve pinchazo en el dedo, verificaremos tus niveles de hemoglobina para descartar anemia.</p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="mb-4 inline-block border-b-2 border-primary pb-1.5 text-[1.8rem]">
            3. Alta Médica y Notificación
          </h2>
          <p className="text-lg leading-relaxed">
            Una vez que pasas el chequeo preliminar, se te considera &quot;apto&quot; para la extracción de ese día.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            Posterior a la donación, tu sangre será analizada exhaustivamente en nuestros laboratorios. 
            Si todos los resultados son satisfactorios (descarte de infecciones, confirmación de grupo sanguíneo, etc.), se emite el <strong>Alta Médica Definitiva</strong> de esa unidad, lo que significa que está lista para salvar una vida. 
            Se te notificará por correo electrónico o SMS cuando tu donación haya sido procesada y aprobada exitosamente, ¡confirmando que ya eres un héroe activo!
          </p>
        </div>
      </section>
    </main>
  );
}
