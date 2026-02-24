import HeroCarousel from "../componentes/HeroCarousel";

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Espacio por si más adelante se agrega contenido debajo del hero */}
      </div>
    </main>
  );
}
