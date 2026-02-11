export default function FormasAyuda() {
  return (
    <main>
      <section style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "#e04b44" }}>
          Formas de Ayudar
        </h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#333" }}>
          Existen muchas maneras de contribuir a nuestra causa. Además de la donación de sangre,
          puedes ayudar organizando campañas, compartiendo información en redes sociales o
          realizando donaciones económicas para mejorar nuestros servicios.
        </p>
        
        <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          <div style={{ padding: "1.5rem", border: "1px solid #eee", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Voluntariado</h3>
            <p>Únete a nuestro equipo de voluntarios y ayúdanos en los centros de donación y campañas móviles.</p>
          </div>
          
          <div style={{ padding: "1.5rem", border: "1px solid #eee", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Difusión</h3>
            <p>Comparte nuestros mensajes y educa a tu comunidad sobre la importancia de la donación de sangre.</p>
          </div>
          
          <div style={{ padding: "1.5rem", border: "1px solid #eee", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Donaciones Corporativas</h3>
            <p>Tu empresa puede patrocinar campañas de donación o realizar aportes para equipamiento.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
