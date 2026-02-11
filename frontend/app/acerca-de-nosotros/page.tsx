export default function AcercaDeNosotros() {
  return (
    <main>
      <section style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "#e04b44" }}>
          Acerca de Nosotros
        </h1>
        <div style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#333" }}>
          <p style={{ marginBottom: "1.5rem" }}>
            Somos "Gota de Sangre", una organización comprometida con la salud y el bienestar de nuestra comunidad. 
            Nuestra misión es conectar donantes con pacientes que necesitan transfusiones, facilitando el proceso 
            de donación y asegurando que la sangre segura esté disponible para quienes la necesitan.
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            Trabajamos incansablemente para promover la cultura de la donación voluntaria y altruista, 
            educando a la población sobre la importancia de este acto de solidaridad que salva vidas.
          </p>
          
          <h2 style={{ fontSize: "1.8rem", marginTop: "2.5rem", marginBottom: "1rem" }}>Lo que hacemos</h2>
          <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>Organizamos campañas de donación de sangre en empresas y comunidades.</li>
            <li style={{ marginBottom: "0.5rem" }}>Brindamos apoyo y orientación a pacientes con enfermedades hematológicas.</li>
            <li style={{ marginBottom: "0.5rem" }}>Colaboramos con hospitales y bancos de sangre para mantener niveles adecuados de reservas.</li>
            <li style={{ marginBottom: "0.5rem" }}>Realizamos actividades educativas para desmitificar la donación de sangre.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
