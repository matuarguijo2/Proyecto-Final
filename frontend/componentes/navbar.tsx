"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { Poppins } from "next/font/google";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });
const poppins = Poppins({ weight: "600", subsets: ["latin"] });

type OpenMenu = "involucrate" | "conocemas" | "serdonante" | null;

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);

  return (
    <nav className={`border-b border-gray-200 bg-white ${roboto.className}`}>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-2">
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center overflow-visible">
            <Image
              src="/img/logo.png"
              alt="Gota Sangre logo"
              width={320}
              height={92}
              priority
              quality={95}
              sizes="(min-width: 768px) 320px, 280px"
              className="h-16 w-auto object-contain object-left md:h-[4.5rem]"
            />
          </Link>
        </div>

        <ul className="hidden list-none gap-4 p-0 m-0 items-center md:flex">
          <li
            className="relative flex h-full items-center"
            onMouseEnter={() => setOpenMenu("involucrate")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <Link href="/involucrate" className="text-gray-700 no-underline font-medium text-[15px] py-1.5 hover:text-primary transition-colors">
              Involúcrate
            </Link>
            <ul
              className={`absolute left-0 top-full z-[100] flex min-w-52 flex-col gap-0 rounded-lg bg-white px-0 py-1.5 shadow-lg transition-all duration-200 ${
                openMenu === "involucrate"
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <li className="block w-full m-0">
                <Link href="/serdonante" className="block w-full px-4 py-2 text-[#444] text-[13px] font-medium no-underline transition-colors hover:bg-gray-50 hover:text-primary">
                  Conviértete en donante
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/formas-ayuda" className="block w-full px-4 py-2 text-[#444] text-[13px] font-medium no-underline transition-colors hover:bg-gray-50 hover:text-primary">
                  Formas de ayudar
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/pacientes" className="block w-full px-4 py-2 text-[#444] text-[13px] font-medium no-underline transition-colors hover:bg-gray-50 hover:text-primary">
                  Pacientes
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/involucrate/crear-campana" className="block w-full px-4 py-2 text-[#444] text-[13px] font-medium no-underline transition-colors hover:bg-gray-50 hover:text-primary">
                  Crear campaña
                </Link>
              </li>
            </ul>
          </li>
          <li
            className="relative flex h-full items-center"
            onMouseEnter={() => setOpenMenu("conocemas")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <Link href="/conocemas" className="text-gray-700 no-underline font-medium text-[15px] py-1.5 hover:text-primary transition-colors">
              Conoce Más
            </Link>
            <ul
              className={`absolute left-0 top-full z-[100] flex min-w-52 flex-col gap-0 rounded-lg bg-white px-0 py-1.5 shadow-lg transition-all duration-200 ${
                openMenu === "conocemas"
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <li className="block w-full m-0">
                <Link href="/acerca-de-nosotros" className="block w-full px-4 py-2 text-[#444] text-[13px] font-medium no-underline transition-colors hover:bg-gray-50 hover:text-primary">
                  Acerca de nosotros
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/cancer-de-sangre" className="block w-full px-4 py-2 text-[#444] text-[13px] font-medium no-underline transition-colors hover:bg-gray-50 hover:text-primary">
                  Cáncer de sangre
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/conocemas/campanas" className="block w-full px-4 py-2 text-[#444] text-[13px] font-medium no-underline transition-colors hover:bg-gray-50 hover:text-primary">
                  Conocer campañas
                </Link>
              </li>
            </ul>
          </li>
          <li
            className="relative flex h-full items-center"
            onMouseEnter={() => setOpenMenu("serdonante")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <Link href="/serdonante" className="text-gray-700 no-underline font-medium text-[15px] py-1.5 hover:text-primary transition-colors">
              Ser Donante
            </Link>
            <ul
              className={`absolute left-0 top-full z-[100] flex min-w-52 flex-col gap-0 rounded-lg bg-white px-0 py-1.5 shadow-lg transition-all duration-200 ${
                openMenu === "serdonante"
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <li className="block w-full m-0">
                <Link href="/requisitos-donante" className="block w-full px-4 py-2 text-[#444] text-[13px] font-medium no-underline transition-colors hover:bg-gray-50 hover:text-primary">
                  Buscando la compatibilidad perfecta
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/preparacion-donacion" className="block w-full px-4 py-2 text-[#444] text-[13px] font-medium no-underline transition-colors hover:bg-gray-50 hover:text-primary">
                  Preparándose para donar
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/post-donacion" className="block w-full px-4 py-2 text-[#444] text-[13px] font-medium no-underline transition-colors hover:bg-gray-50 hover:text-primary">
                  Qué hacer después de la donación
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/tiempo-donacion" className="block w-full px-4 py-2 text-[#444] text-[13px] font-medium no-underline transition-colors hover:bg-gray-50 hover:text-primary">
                  ¿Cuánto tiempo tarda?
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative flex h-full items-center">
            <Link href="/mapa" className="text-gray-700 no-underline font-medium text-[15px] py-1.5 hover:text-primary transition-colors">
              Mapa
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/registro"
            className={`${poppins.className} inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-white no-underline shadow-sm transition-opacity hover:opacity-90`}
          >
            REGÍSTRATE
          </Link>
          <Link
            href="/aporte"
            className={`${poppins.className} inline-flex items-center justify-center rounded-full bg-brand-green px-4 py-2 text-[13px] font-semibold text-white no-underline shadow-sm transition-opacity hover:opacity-90`}
          >
            HAZ TU APORTE
          </Link>
        </div>
      </div>
    </nav>
  );
}
