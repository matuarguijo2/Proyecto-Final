export default function Pacientes() {
  return (
    <main>
      <section style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "#e04b44" }}>
          Información para Pacientes
        </h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#333" }}>
          Aquí encontrarás información relevante para pacientes que requieren transfusiones sanguíneas
          y sus familiares. Nuestro objetivo es brindar apoyo y claridad durante el proceso.
        </p>
        
        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#333" }}>Preguntas Frecuentes</h2>
          
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "0.5rem" }}>¿Cómo solicito sangre?</h3>
            <p>La solicitud de sangre debe ser realizada directamente por el hospital donde te encuentras ingresado. 
            Nosotros coordinamos con la institución médica.</p>
          </div>
          
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "0.5rem" }}>¿Tiene costo la sangre?</h3>
            <p>La sangre en sí misma no se cobra, pero existen costos asociados al procesamiento, análisis y almacenamiento 
            que garantizan su seguridad y calidad.</p>
          </div>
          
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "0.5rem" }}>¿Puedo recibir donaciones dirigidas?</h3>
            <p>Sí, familiares y amigos pueden donar específicamente para un paciente, siempre que sean compatibles.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
