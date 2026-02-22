export default function CancerDeSangre() {
  return (
    <main>
      <section className="mx-auto max-w-[1200px] px-8 py-16">
        <h1 className="mb-6 text-[2.5rem] text-primary">
          Cáncer de Sangre
        </h1>
        
        <div className="text-lg leading-relaxed text-gray-700">
          <p className="mb-8">
            El cáncer de sangre afecta la producción y función de las células sanguíneas. La mayoría de estos cánceres 
            comienzan en la médula ósea, donde se produce la sangre. Las células madre en la médula ósea maduran y 
            se convierten en tres tipos de células sanguíneas: glóbulos rojos, glóbulos blancos o plaquetas.
          </p>

          <div className="mb-12 rounded-xl bg-gray-50 p-8">
            <h2 className="mb-4 text-3xl">Leucemia</h2>
            <div className="flex flex-wrap gap-8">
              <div className="flex-1">
                <p className="mb-4">
                  La leucemia es un tipo de cáncer que afecta a la sangre y la médula ósea. Se produce por la 
                  creación rápida anormal de glóbulos blancos. Estas células anormales no pueden combatir 
                  las infecciones y menoscaban la capacidad de la médula ósea para producir glóbulos rojos y plaquetas.
                </p>
                <h3 className="mb-2 text-xl font-semibold">Características:</h3>
                <ul className="list-disc pl-6">
                  <li>Fatiga persistente y debilidad.</li>
                  <li>Infecciones frecuentes o graves.</li>
                  <li>Pérdida de peso sin intentarlo.</li>
                  <li>Ganglios linfáticos inflamados.</li>
                  <li>Sangrado o formación de moretones con facilidad.</li>
                </ul>
              </div>
              <div className="flex min-w-[300px] flex-1 items-center justify-center rounded-lg bg-gray-200 h-[300px]">
                <div className="text-center text-gray-500">
                  <span className="mb-2.5 block text-4xl">🩸</span>
                  <p>Ilustración de Células Leucémicas</p>
                  <small>Glóbulos blancos anormales vs normales</small>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-8">
            <h2 className="mb-4 text-3xl">Linfoma</h2>
            <div className="flex flex-wrap gap-8">
              <div className="order-2 flex-1">
                <p className="mb-4">
                  El linfoma es un cáncer del sistema linfático, que es parte de la red del organismo que combate los gérmenes.
                  El sistema linfático comprende los ganglios linfáticos, el bazo, el timo y la médula ósea.
                  El linfoma puede afectar a todas esas zonas así como a otros órganos de todo el cuerpo.
                </p>
                <h3 className="mb-2 text-xl font-semibold">Características:</h3>
                <ul className="list-disc pl-6">
                  <li>Hinchazón indolora de ganglios linfáticos en cuello, axilas o ingle.</li>
                  <li>Fiebre recurrente.</li>
                  <li>Sudores nocturnos.</li>
                  <li>Dificultad para respirar.</li>
                  <li>Picazón en la piel.</li>
                </ul>
              </div>
              <div className="order-1 flex min-w-[300px] flex-1 items-center justify-center rounded-lg bg-gray-200 h-[300px]">
                <div className="text-center text-gray-500">
                  <span className="mb-2.5 block text-4xl">🧬</span>
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
