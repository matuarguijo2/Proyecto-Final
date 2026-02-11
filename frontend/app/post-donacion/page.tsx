export default function PostDonacion() {
  return (
    <main>
      <section style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "#e04b44" }}>
          Qué hacer después de la donación
        </h1>
        
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#666", marginBottom: "2rem" }}>
          ¡Gracias por tu generosidad! Tu donación puede salvar hasta tres vidas. Para asegurar tu bienestar y una 
          rápida recuperación, te recomendamos seguir estos cuidados durante las próximas horas.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          
          <div style={{ padding: "2rem", backgroundColor: "#fff", border: "1px solid #eee", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#e04b44" }}>Inmediatamente después</h2>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", lineHeight: "1.6" }}>
              <li style={{ marginBottom: "0.5rem" }}>Descansa en el área de refrigerio por al menos 15 minutos.</li>
              <li style={{ marginBottom: "0.5rem" }}>Toma el refrigerio y la bebida que te ofrecemos para reponer líquidos y azúcar.</li>
              <li style={{ marginBottom: "0.5rem" }}>Mantén el vendaje en el brazo durante las próximas 4 horas.</li>
              <li style={{ marginBottom: "0.5rem" }}>Si sientes mareos, acuéstate o siéntate con la cabeza entre las rodillas hasta que pase.</li>
            </ul>
          </div>

          <div style={{ padding: "2rem", backgroundColor: "#fff", border: "1px solid #eee", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#2e7d32" }}>Durante el resto del día</h2>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", lineHeight: "1.6" }}>
              <li style={{ marginBottom: "0.5rem" }}>Bebe más líquidos de lo habitual (agua, jugos) durante las siguientes 24 horas.</li>
              <li style={{ marginBottom: "0.5rem" }}>Evita levantar objetos pesados o realizar ejercicios vigorosos por hoy.</li>
              <li style={{ marginBottom: "0.5rem" }}>No consumas bebidas alcohólicas hasta haber comido bien y recuperado líquidos.</li>
              <li style={{ marginBottom: "0.5rem" }}>Evita fumar por al menos 2 horas después de donar.</li>
            </ul>
          </div>

        </div>

        <div style={{ marginTop: "3rem", padding: "2rem", backgroundColor: "#ffebee", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#c62828" }}>¿Cuándo contactarnos?</h2>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
            Aunque es poco común, pueden presentarse algunas reacciones. Contáctanos o acude al médico si:
          </p>
          <ul style={{ listStyleType: "circle", paddingLeft: "2rem", marginTop: "1rem", lineHeight: "1.6" }}>
            <li>Sientes mareos persistentes o desmayos después de haber descansado.</li>
            <li>Observas un hematoma grande, dolor o hinchazón en el sitio de la punción.</li>
            <li>Presentas fiebre o síntomas de enfermedad en los días siguientes a la donación (es importante para la seguridad de la sangre).</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
