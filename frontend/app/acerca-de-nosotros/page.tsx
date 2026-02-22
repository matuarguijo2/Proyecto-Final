export default function AcercaDeNosotros() {
  return (
    <main>
      <section className="mx-auto max-w-[1200px] px-8 py-16">
        <h1 className="mb-6 text-[2.5rem] text-primary">
          Acerca de Nosotros
        </h1>
        <div className="text-lg leading-relaxed text-gray-700">
          <p className="mb-6">
            Somos &quot;Gota de Sangre&quot;, una organización comprometida con la salud y el bienestar de nuestra comunidad. 
            Nuestra misión es conectar donantes con pacientes que necesitan transfusiones, facilitando el proceso 
            de donación y asegurando que la sangre segura esté disponible para quienes la necesitan.
          </p>
          <p className="mb-6">
            Trabajamos incansablemente para promover la cultura de la donación voluntaria y altruista, 
            educando a la población sobre la importancia de este acto de solidaridad que salva vidas.
          </p>
          
          <h2 className="mt-10 mb-4 text-[1.8rem]">Lo que hacemos</h2>
          <ul className="list-disc pl-6">
            <li className="mb-2">Organizamos campañas de donación de sangre en empresas y comunidades.</li>
            <li className="mb-2">Brindamos apoyo y orientación a pacientes con enfermedades hematológicas.</li>
            <li className="mb-2">Colaboramos con hospitales y bancos de sangre para mantener niveles adecuados de reservas.</li>
            <li className="mb-2">Realizamos actividades educativas para desmitificar la donación de sangre.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
