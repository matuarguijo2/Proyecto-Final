export default function TiempoDonacion() {
  return (
    <main>
      <section style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "#e04b44" }}>
          ¿Cuánto tiempo tarda la donación?
        </h1>
        
        <p style={{ fontSize: "1.2rem", lineHeight: "1.6", color: "#333", marginBottom: "2rem" }}>
          El proceso completo de donación de sangre suele tomar entre <strong>45 y 60 minutos</strong>. 
          Sin embargo, este tiempo puede variar considerablemente dependiendo de cada situación individual.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "3rem" }}>
            
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ backgroundColor: "#e04b44", color: "#fff", width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: "bold", flexShrink: 0 }}>1</div>
                <div>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Registro y Entrevista (15 - 20 min)</h3>
                    <p>Llenarás un formulario con tus datos y pasarás a una entrevista privada con un profesional de la salud para asegurar que donar sea seguro para ti y para el paciente que recibirá tu sangre.</p>
                </div>
            </div>

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ backgroundColor: "#e04b44", color: "#fff", width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: "bold", flexShrink: 0 }}>2</div>
                <div>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>La Donación (10 - 15 min)</h3>
                    <p>La extracción de sangre en sí misma es rápida. Te reclinarás cómodamente mientras se recolecta una unidad de sangre (450 ml aprox.).</p>
                </div>
            </div>

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ backgroundColor: "#e04b44", color: "#fff", width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: "bold", flexShrink: 0 }}>3</div>
                <div>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Refrigerio y Descanso (15 min)</h3>
                    <p>Después de donar, pasarás al área de descanso donde tomarás una bebida y un snack. Es vital que permanezcas aquí unos minutos para asegurar que te sientes bien antes de irte.</p>
                </div>
            </div>

        </div>

        <div style={{ padding: "2.5rem", backgroundColor: "#e3f2fd", borderRadius: "12px", borderLeft: "8px solid #2196f3" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#0d47a1" }}>La salud es lo que determina el tiempo</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
                Es posible que en algunas ocasiones el proceso tome un poco más de tiempo. Esto se debe a que <strong>nuestra prioridad absoluta es la seguridad</strong>, tanto tuya como donante, como la de los pacientes que recibirán la transfusión.
            </p>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                Cada paso, desde la revisión de tus niveles de hemoglobina hasta la verificación de tus signos vitales, se realiza con minuciosa atención. Si el personal médico necesita más tiempo para evaluar tu historial o verificar tu estado de salud actual, lo haremos sin prisa. 
                <strong>Unos minutos extra pueden significar la diferencia entre una donación segura y efectiva, y una complicación evitable.</strong> Tu paciencia es parte de tu regalo de vida.
            </p>
        </div>

      </section>
    </main>
  );
}
