export default function RequisitosDonante() {
  return (
    <main>
      <section style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "#e04b44" }}>
          Buscando la compatibilidad perfecta
        </h1>
        
        <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#333" }}>Requisitos básicos para registrarte</h2>
            <p style={{ marginBottom: "1rem", color: "#666" }}>Antes de iniciar tu proceso de registro, asegúrate de cumplir con lo siguiente:</p>
            <ol style={{ listStyleType: "decimal", paddingLeft: "1.5rem", lineHeight: "1.8", fontSize: "1.1rem" }}>
                <li>Tener entre 18 y 65 años de edad.</li>
                <li>Pesar más de 50 kg (110 libras).</li>
                <li>Gozar de buen estado de salud general.</li>
                <li>Presentar un documento de identidad válido (DNI, Cédula, Pasaporte).</li>
                <li>No haber donado sangre en los últimos 3 meses (hombres) o 4 meses (mujeres).</li>
                <li>No haber tenido cirugías mayores en los últimos 6 meses.</li>
                <li>No haberse realizado tatuajes o piercings en los últimos 12 meses.</li>
            </ol>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
            
            <div style={{ padding: "2rem", backgroundColor: "#e8f5e9", borderRadius: "12px", borderLeft: "6px solid #43a047" }}>
                <h2 style={{ fontSize: "1.6rem", marginBottom: "1rem", color: "#2e7d32" }}>✅ Enfermedades permitidas</h2>
                <p style={{ marginBottom: "1rem" }}>Puedes registrarte y donar si padeces las siguientes condiciones, siempre que estén controladas:</p>
                <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", lineHeight: "1.6" }}>
                    <li><strong>Hipertensión arterial:</strong> Si tienes la presión controlada y estable en el momento de la donación.</li>
                    <li><strong>Diabetes:</strong> Solo si es tratada con dieta o medicamentos orales (no dependiente de insulina) y está controlada.</li>
                    <li><strong>Problemas de Tiroides:</strong> Hipotiroidismo o eutiroidismo bajo tratamiento y control.</li>
                    <li><strong>Asma:</strong> Si no has tenido crisis ni usado esteroides orales en los últimos meses.</li>
                    <li><strong>Colesterol alto:</strong> Si está bajo tratamiento y control.</li>
                    <li><strong>Alergias:</strong> Si no tienes síntomas agudos en el momento de donar (congestión severa, fiebre, etc.).</li>
                </ul>
            </div>

            <div style={{ padding: "2rem", backgroundColor: "#ffebee", borderRadius: "12px", borderLeft: "6px solid #e53935" }}>
                <h2 style={{ fontSize: "1.6rem", marginBottom: "1rem", color: "#c62828" }}>❌ Enfermedades no permitidas</h2>
                <p style={{ marginBottom: "1rem" }}>No podrás registrarte como donante si padeces o has padecido:</p>
                <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", lineHeight: "1.6" }}>
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
