import Link from "next/link";

export default function Notfound() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
      <p className="mb-6 text-xl text-gray-600">Página no encontrada</p>
      <Link
        href="/"
        className="rounded-full bg-primary px-6 py-3 font-semibold text-white no-underline transition-colors hover:bg-primary/90"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
