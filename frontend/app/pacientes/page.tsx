export default function Pacientes() {
  return (
    <main>
      <section className="mx-auto max-w-[1200px] px-8 py-16">
        <h1 className="mb-6 text-[2.5rem] text-primary">
          Información para Pacientes
        </h1>
        <p className="text-lg leading-relaxed text-gray-700">
          Aquí encontrarás información relevante para pacientes que requieren transfusiones sanguíneas
          y sus familiares. Nuestro objetivo es brindar apoyo y claridad durante el proceso.
        </p>
        
        <div className="mt-8">
          <h2 className="mb-4 text-[1.8rem] text-gray-700">Preguntas Frecuentes</h2>
          
          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold">¿Cómo solicito sangre?</h3>
            <p>
              La solicitud de sangre debe ser realizada directamente por el hospital donde te encuentras ingresado. 
              Nosotros coordinamos con la institución médica.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold">¿Tiene costo la sangre?</h3>
            <p>
              La sangre en sí misma no se cobra, pero existen costos asociados al procesamiento, análisis y almacenamiento 
              que garantizan su seguridad y calidad.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold">¿Puedo recibir donaciones dirigidas?</h3>
            <p>
              Sí, familiares y amigos pueden donar específicamente para un paciente, siempre que sean compatibles.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
