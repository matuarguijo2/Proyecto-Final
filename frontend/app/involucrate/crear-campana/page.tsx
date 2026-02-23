import FormularioCrearCampana from "./FormularioCrearCampana";

export const metadata = {
  title: "Crear campaña de donación | Involúcrate",
  description: "Crea tu campaña de donación de sangre: datos del receptor, centro de salud y contacto.",
};

export default function CrearCampanaPage() {
  return (
    <main>
      <FormularioCrearCampana />
    </main>
  );
}
