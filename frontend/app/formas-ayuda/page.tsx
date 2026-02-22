export default function FormasAyuda() {
  return (
    <main>
      <section className="mx-auto max-w-[1200px] px-8 py-16">
        <h1 className="mb-6 text-[2.5rem] text-primary">
          Formas de Ayudar
        </h1>
        <p className="text-lg leading-relaxed text-gray-700">
          Existen muchas maneras de contribuir a nuestra causa. Además de la donación de sangre,
          puedes ayudar organizando campañas, compartiendo información en redes sociales o
          realizando donaciones económicas para mejorar nuestros servicios.
        </p>
        
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="mb-4 text-2xl">Voluntariado</h3>
            <p>Únete a nuestro equipo de voluntarios y ayúdanos en los centros de donación y campañas móviles.</p>
          </div>
          
          <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="mb-4 text-2xl">Difusión</h3>
            <p>Comparte nuestros mensajes y educa a tu comunidad sobre la importancia de la donación de sangre.</p>
          </div>
          
          <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="mb-4 text-2xl">Donaciones Corporativas</h3>
            <p>Tu empresa puede patrocinar campañas de donación o realizar aportes para equipamiento.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
