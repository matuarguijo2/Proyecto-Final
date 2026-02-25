"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const footerSections = [
  {
    title: "Involúcrate",
    links: [
      { label: "Conviértete en donante", href: "/registro/donante" },
      { label: "Formas de ayudar", href: "/formas-ayuda" },
      { label: "Pacientes", href: "/pacientes" },
      { label: "Crear campaña", href: "/involucrate/crear-campana" },
    ],
  },
  {
    title: "Conoce más",
    links: [
      { label: "Acerca de nosotros", href: "/acerca-de-nosotros" },
      { label: "Cáncer de sangre", href: "/cancer-de-sangre" },
      { label: "Conocer campañas", href: "/conocemas/campanas" },
    ],
  },
  {
    title: "Ser donante",
    links: [
      { label: "Buscando la compatibilidad perfecta", href: "/requisitos-donante" },
      { label: "Preparándose para donar", href: "/preparacion-donacion" },
      { label: "Después de la donación", href: "/post-donacion" },
      { label: "¿Cuánto tiempo tarda?", href: "/tiempo-donacion" },
    ],
  },
];

const utilityLinks = [
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes", icon: "question" },
  { label: "Contacto", href: "/contacto", icon: "phone" },
  { label: "Actualiza tus datos", href: "/mis-datos", icon: "document" },
];

export default function Footer() {
  const [formasAyudaOpen, setFormasAyudaOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFormasAyudaOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <footer className="bg-[#f5f5f5] text-gray-800">
      <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-8">
        {/* Logo arriba a la izquierda */}
        <div className="mb-10">
          <Link href="/" className="inline-block">
            <Image
              src="/img/logo.png"
              alt="Gota de Sangre"
              width={320}
              height={92}
              className="h-16 w-auto object-contain object-left md:h-20"
            />
            <p className="mt-1 text-sm text-gray-500">Juntos contra el cáncer de sangre</p>
          </Link>
        </div>

        {/* Columnas: secciones + utilidades a la derecha */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900">
                {section.title}
              </h3>
              <ul className="list-none space-y-2 p-0">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 no-underline transition hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Columna derecha: Preguntas frecuentes, Contacto, Actualiza tus datos, Formas de ayudar (dropdown) */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900">
              Más información
            </h3>
            <ul className="list-none space-y-2 p-0">
              {utilityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 no-underline transition hover:text-primary"
                  >
                    {link.icon === "question" && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-xs font-bold text-gray-600">
                        ?
                      </span>
                    )}
                    {link.icon === "phone" && (
                      <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    )}
                    {link.icon === "document" && (
                      <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setFormasAyudaOpen(!formasAyudaOpen)}
                  className="inline-flex w-full items-center justify-between gap-2 text-left text-sm text-gray-600 transition hover:text-primary"
                  aria-expanded={formasAyudaOpen}
                  aria-haspopup="true"
                >
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Formas de ayudar
                  </span>
                  <svg
                    className={`h-4 w-4 shrink-0 transition-transform ${formasAyudaOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {formasAyudaOpen && (
                  <ul className="mt-2 list-none space-y-1 border-l-2 border-gray-300 pl-4">
                    <li>
                      <Link
                        href="/involucrate/crear-campana"
                        className="text-sm text-gray-600 no-underline hover:text-primary"
                        onClick={() => setFormasAyudaOpen(false)}
                      >
                        Crea tu campaña
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/aporte"
                        className="text-sm text-gray-600 no-underline hover:text-primary"
                        onClick={() => setFormasAyudaOpen(false)}
                      >
                        Aporta a Gota de Sangre
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Dirección abajo a la izquierda */}
        <div className="mt-10 border-t border-gray-300 pt-8">
          <div className="max-w-md">
            <p className="font-semibold text-gray-900">Gota de Sangre</p>
            <p className="mt-1 text-sm text-gray-600">
              Universidad Santo Tomás de Aquino
              <br />
              Av. Perón 1.500, Yerba Buena
              <br />
              Localidad: Yerba Buena · Provincia: Tucumán
            </p>
          </div>
        </div>
      </div>

      {/* Derechos reservados centrado abajo */}
      <div className="border-t border-gray-300 bg-[#ebebeb] py-4">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Gota de Sangre. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
