export default function RequisitosDonante() {
  return (
    <main>
      <section className="mx-auto max-w-[1200px] px-8 py-16">
        <h1 className="mb-6 text-[2.5rem] text-primary">
          Buscando la compatibilidad perfecta
        </h1>
        
        <div className="mb-12">
          <h2 className="mb-4 text-[1.8rem] text-gray-700">Requisitos básicos para registrarte</h2>
          <p className="mb-4 text-gray-500">Antes de iniciar tu proceso de registro, asegúrate de cumplir con lo siguiente:</p>
          <ol className="list-decimal pl-6 text-lg leading-relaxed">
            <li>Tener entre 18 y 65 años de edad.</li>
            <li>Pesar más de 50 kg (110 libras).</li>
            <li>Gozar de buen estado de salud general.</li>
            <li>Presentar un documento de identidad válido (DNI, Cédula, Pasaporte).</li>
            <li>No haber donado sangre en los últimos 3 meses (hombres) o 4 meses (mujeres).</li>
            <li>No haber tenido cirugías mayores en los últimos 6 meses.</li>
            <li>No haberse realizado tatuajes o piercings en los últimos 12 meses.</li>
          </ol>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          <div className="rounded-xl border-l-[6px] border-brand-green-dark bg-[#e8f5e9] p-8">
            <h2 className="mb-4 text-2xl text-brand-green-dark">✅ Enfermedades permitidas</h2>
            <p className="mb-4">Puedes registrarte y donar si padeces las siguientes condiciones, siempre que estén controladas:</p>
            <ul className="list-disc pl-6 leading-relaxed">
              <li><strong>Hipertensión arterial:</strong> Si tienes la presión controlada y estable en el momento de la donación.</li>
              <li><strong>Diabetes:</strong> Solo si es tratada con dieta o medicamentos orales (no dependiente de insulina) y está controlada.</li>
              <li><strong>Problemas de Tiroides:</strong> Hipotiroidismo o eutiroidismo bajo tratamiento y control.</li>
              <li><strong>Asma:</strong> Si no has tenido crisis ni usado esteroides orales en los últimos meses.</li>
              <li><strong>Colesterol alto:</strong> Si está bajo tratamiento y control.</li>
              <li><strong>Alergias:</strong> Si no tienes síntomas agudos en el momento de donar (congestión severa, fiebre, etc.).</li>
            </ul>
          </div>

          <div className="rounded-xl border-l-[6px] border-red-600 bg-[#ffebee] p-8">
            <h2 className="mb-4 text-2xl text-brand-red-dark">❌ Enfermedades no permitidas</h2>
            <p className="mb-4">No podrás registrarte como donante si padeces o has padecido:</p>
            <ul className="list-disc pl-6 leading-relaxed">
              <li><strong>Infecciosas graves:</strong> VIH/SIDA, Hepatitis B o C, HTLV, Sífilis (actual o no tratada).</li>
              <li><strong>Enfermedad de Chagas:</strong> Haberla padecido en cualquier momento de la vida.</li>
              <li><strong>Cáncer:</strong> Antecedentes de cáncer hematológico (leucemia, linfoma). Otros cánceres requieren evaluación post-tratamiento (generalmente 5 años libre de enfermedad).</li>
              <li><strong>Enfermedades cardíacas graves:</strong> Infartos previos, angina de pecho inestable, insuficiencia cardíaca.</li>
              <li><strong>Enfermedades autoinmunes severas:</strong> Lupus eritematoso sistémico, artritis reumatoide severa.</li>
              <li><strong>Epilepsia:</strong> Si estás bajo tratamiento continuo (algunos protocolos difieren, pero generalmente es exclusión).</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
