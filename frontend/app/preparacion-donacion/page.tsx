export default function PreparacionDonacion() {
  return (
    <main>
      <section style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "#e04b44" }}>
          Preparándose para donar
        </h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#666", marginBottom: "3rem" }}>
            Donar sangre es un proceso seguro y sencillo. Aquí te explicamos paso a paso qué esperar para que te sientas cómodo y preparado.
        </p>

        <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", borderBottom: "2px solid #e04b44", display: "inline-block", paddingBottom: "5px" }}>1. ¿Dónde y cuándo donar?</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
                Puedes donar en nuestros centros fijos de donación o en las unidades móviles que visitan diferentes puntos de la ciudad.
            </p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ background: "#f5f5f5", padding: "1rem", marginBottom: "0.5rem", borderRadius: "8px" }}>
                    <strong>Centros Fijos:</strong> Disponibles de Lunes a Sábado de 7:00 AM a 5:00 PM. Ubicados en Hospital Central y Clínica Norte.
                </li>
                <li style={{ background: "#f5f5f5", padding: "1rem", marginBottom: "0.5rem", borderRadius: "8px" }}>
                    <strong>Campañas Móviles:</strong> Consulta nuestro calendario mensual en la sección de "Involúcrate" para ver cuándo estaremos cerca de tu zona.
                </li>
            </ul>
        </div>

        <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", borderBottom: "2px solid #e04b44", display: "inline-block", paddingBottom: "5px" }}>2. Chequeo Médico Preliminar</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
                Antes de la extracción, realizaremos una breve evaluación para garantizar tu seguridad y la del receptor. Este chequeo es gratuito y confidencial.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
                 <div style={{ border: "1px solid #ddd", padding: "1.5rem", borderRadius: "8px" }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>Entrevista Privada</h3>
                    <p>Un profesional de la salud te hará preguntas sobre tu historial médico y estilo de vida.</p>
                 </div>
                 <div style={{ border: "1px solid #ddd", padding: "1.5rem", borderRadius: "8px" }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>Signos Vitales</h3>
                    <p>Mediremos tu presión arterial, pulso y temperatura para asegurar que estás en condiciones óptimas.</p>
                 </div>
                 <div style={{ border: "1px solid #ddd", padding: "1.5rem", borderRadius: "8px" }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>Prueba de Hierro</h3>
                    <p>Con un leve pinchazo en el dedo, verificaremos tus niveles de hemoglobina para descartar anemia.</p>
                 </div>
            </div>
        </div>

        <div style={{ marginBottom: "2.5rem" }}>
             <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", borderBottom: "2px solid #e04b44", display: "inline-block", paddingBottom: "5px" }}>3. Alta Médica y Notificación</h2>
             <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                Una vez que pasas el chequeo preliminar, se te considera "apto" para la extracción de ese día.
             </p>
             <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginTop: "1rem" }}>
                Posterior a la donación, tu sangre será analizada exhaustivamente en nuestros laboratorios. 
                Si todos los resultados son satisfactorios (descarte de infecciones, confirmación de grupo sanguíneo, etc.), se emite el <strong>Alta Médica Definitiva</strong> de esa unidad, lo que significa que está lista para salvar una vida. 
                Se te notificará por correo electrónico o SMS cuando tu donación haya sido procesada y aprobada exitosamente, ¡confirmando que ya eres un héroe activo!
             </p>
        </div>

      </section>
    </main>
  );
}
