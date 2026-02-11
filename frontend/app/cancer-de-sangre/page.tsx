export default function CancerDeSangre() {
  return (
    <main>
      <section style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "#e04b44" }}>
          Cáncer de Sangre
        </h1>
        
        <div style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#333" }}>
          <p style={{ marginBottom: "2rem" }}>
            El cáncer de sangre afecta la producción y función de las células sanguíneas. La mayoría de estos cánceres 
            comienzan en la médula ósea, donde se produce la sangre. Las células madre en la médula ósea maduran y 
            se convierten en tres tipos de células sanguíneas: glóbulos rojos, glóbulos blancos o plaquetas.
          </p>

          <div style={{ padding: "2rem", backgroundColor: "#f9f9f9", borderRadius: "12px", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Leucemia</h2>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              <div style={{ flex: "1" }}>
                <p style={{ marginBottom: "1rem" }}>
                  La leucemia es un tipo de cáncer que afecta a la sangre y la médula ósea. Se produce por la 
                  creación rápida anormal de glóbulos blancos. Estas células anormales no pueden combatir 
                  las infecciones y menoscaban la capacidad de la médula ósea para producir glóbulos rojos y plaquetas.
                </p>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "0.5rem" }}>Características:</h3>
                <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                  <li>Fatiga persistente y debilidad.</li>
                  <li>Infecciones frecuentes o graves.</li>
                  <li>Pérdida de peso sin intentarlo.</li>
                  <li>Ganglios linfáticos inflamados.</li>
                  <li>Sangrado o formación de moretones con facilidad.</li>
                </ul>
              </div>
              <div style={{ flex: "1", minWidth: "300px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#eaeaea", borderRadius: "8px", height: "300px" }}>
                 {/* Placeholder para ilustración */}
                 <div style={{ textAlign: "center", color: "#666" }}>
                    <span style={{ display: "block", fontSize: "40px", marginBottom: "10px" }}>🩸</span>
                    <p>Ilustración de Células Leucémicas</p>
                    <small>Glóbulos blancos anormales vs normales</small>
                 </div>
              </div>
            </div>
          </div>

          <div style={{ padding: "2rem", backgroundColor: "#f9f9f9", borderRadius: "12px" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Linfoma</h2>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
               <div style={{ flex: "1", order: 2 }}>
                <p style={{ marginBottom: "1rem" }}>
                  El linfoma es un cáncer del sistema linfático, que es parte de la red del organismo que combate los gérmenes.
                  El sistema linfático comprende los ganglios linfáticos, el bazo, el timo y la médula ósea.
                  El linfoma puede afectar a todas esas zonas así como a otros órganos de todo el cuerpo.
                </p>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "0.5rem" }}>Características:</h3>
                <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                  <li>Hinchazón indolora de ganglios linfáticos en cuello, axilas o ingle.</li>
                  <li>Fiebre recurrente.</li>
                  <li>Sudores nocturnos.</li>
                  <li>Dificultad para respirar.</li>
                  <li>Picazón en la piel.</li>
                </ul>
              </div>
              <div style={{ flex: "1", minWidth: "300px", order: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#eaeaea", borderRadius: "8px", height: "300px" }}>
                 {/* Placeholder para ilustración */}
                 <div style={{ textAlign: "center", color: "#666" }}>
                    <span style={{ display: "block", fontSize: "40px", marginBottom: "10px" }}>🧬</span>
                    <p>Ilustración Sistema Linfático</p>
                    <small>Afectación en ganglios linfáticos</small>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
