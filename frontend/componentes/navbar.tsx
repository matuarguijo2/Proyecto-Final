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
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-2.5">
        <div className="flex items-center">
          <Link href="/" className="flex h-10 items-center overflow-visible">
            <span className="inline-block h-10 overflow-visible leading-none">
              <Image
                src="/img/logo.png"
                alt="Gota Sangre logo"
                width={150}
                height={40}
                priority
                className="block h-10 w-auto origin-left scale-[1.45] max-h-10 md:h-[34px]"
              />
            </span>
          </Link>
        </div>

        <ul className="hidden list-none gap-[18px] p-0 m-0 items-center md:flex">
          <li
            className="relative flex h-full items-center"
            onMouseEnter={() => setOpenMenu("involucrate")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <Link href="/involucrate" className="text-black no-underline font-medium text-xl py-2">
              Involúcrate
            </Link>
            <ul
              className={`absolute left-0 top-full z-[100] flex min-w-60 flex-col gap-0 rounded-lg bg-white px-0 pt-1 pb-2 shadow-lg transition-all duration-200 ${
                openMenu === "involucrate"
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <li className="block w-full m-0">
                <Link href="/serdonante" className="block w-full px-5 py-3 text-[#333] text-[15px] font-medium no-underline transition-colors hover:bg-gray-100 hover:text-primary">
                  Conviértete en donante
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/formas-ayuda" className="block w-full px-5 py-3 text-[#333] text-[15px] font-medium no-underline transition-colors hover:bg-gray-100 hover:text-primary">
                  Formas de ayudar
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/pacientes" className="block w-full px-5 py-3 text-[#333] text-[15px] font-medium no-underline transition-colors hover:bg-gray-100 hover:text-primary">
                  Pacientes
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/involucrate/crear-campana" className="block w-full px-5 py-3 text-[#333] text-[15px] font-medium no-underline transition-colors hover:bg-gray-100 hover:text-primary">
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
            <Link href="/conocemas" className="text-black no-underline font-medium text-xl py-2">
              Conoce Más
            </Link>
            <ul
              className={`absolute left-0 top-full z-[100] flex min-w-60 flex-col gap-0 rounded-lg bg-white px-0 pt-1 pb-2 shadow-lg transition-all duration-200 ${
                openMenu === "conocemas"
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <li className="block w-full m-0">
                <Link href="/acerca-de-nosotros" className="block w-full px-5 py-3 text-[#333] text-[15px] font-medium no-underline transition-colors hover:bg-gray-100 hover:text-primary">
                  Acerca de nosotros
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/cancer-de-sangre" className="block w-full px-5 py-3 text-[#333] text-[15px] font-medium no-underline transition-colors hover:bg-gray-100 hover:text-primary">
                  Cáncer de sangre
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/conocemas/campanas" className="block w-full px-5 py-3 text-[#333] text-[15px] font-medium no-underline transition-colors hover:bg-gray-100 hover:text-primary">
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
            <Link href="/serdonante" className="text-black no-underline font-medium text-xl py-2">
              Ser Donante
            </Link>
            <ul
              className={`absolute left-0 top-full z-[100] flex min-w-60 flex-col gap-0 rounded-lg bg-white px-0 pt-1 pb-2 shadow-lg transition-all duration-200 ${
                openMenu === "serdonante"
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <li className="block w-full m-0">
                <Link href="/requisitos-donante" className="block w-full px-5 py-3 text-[#333] text-[15px] font-medium no-underline transition-colors hover:bg-gray-100 hover:text-primary">
                  Buscando la compatibilidad perfecta
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/preparacion-donacion" className="block w-full px-5 py-3 text-[#333] text-[15px] font-medium no-underline transition-colors hover:bg-gray-100 hover:text-primary">
                  Preparándose para donar
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/post-donacion" className="block w-full px-5 py-3 text-[#333] text-[15px] font-medium no-underline transition-colors hover:bg-gray-100 hover:text-primary">
                  Qué hacer después de la donación
                </Link>
              </li>
              <li className="block w-full m-0">
                <Link href="/tiempo-donacion" className="block w-full px-5 py-3 text-[#333] text-[15px] font-medium no-underline transition-colors hover:bg-gray-100 hover:text-primary">
                  ¿Cuánto tiempo tarda?
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/registro"
            className={`${poppins.className} inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-[15px] font-extrabold text-white no-underline shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all duration-[120ms] hover:-translate-y-0.5`}
          >
            REGÍSTRATE
          </Link>
          <Link
            href="/aporte"
            className={`${poppins.className} inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-[15px] font-extrabold text-white no-underline shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all duration-[120ms] hover:-translate-y-0.5`}
          >
            HAZ TU APORTE
          </Link>
        </div>
      </div>
    </nav>
  );
}
