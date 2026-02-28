"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Roboto } from "next/font/google";
import { Poppins } from "next/font/google";
import { useAuth } from "@/contextos/AuthContext";
import { useHospitalAuth } from "@/contextos/HospitalAuthContext";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });
const poppins = Poppins({ weight: "600", subsets: ["latin"] });

type OpenMenu = "involucrate" | "conocemas" | "serdonante" | "registro" | "usuario" | "hospital" | null;

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { hospital, logout: logoutHospital } = useHospitalAuth();
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const registroRef = useRef<HTMLDivElement>(null);
  const usuarioRef = useRef<HTMLDivElement>(null);
  const hospitalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (registroRef.current && !registroRef.current.contains(target) && usuarioRef.current && !usuarioRef.current.contains(target) && hospitalRef.current && !hospitalRef.current.contains(target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  async function handleLogout() {
    await logout();
    setOpenMenu(null);
    router.push("/");
    router.refresh();
  }

  async function handleLogoutHospital() {
    await logoutHospital();
    setOpenMenu(null);
    router.push("/");
    router.refresh();
  }

  return (
    <nav className={`border-b border-gray-200 bg-white ${roboto.className}`}>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-2">
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center overflow-visible">
            <Image
              src="/img/logo.png"
              alt="Gota Sangre logo"
              width={400}
              height={115}
              priority
              quality={95}
              sizes="(min-width: 768px) 400px, 320px"
              className="h-20 w-auto object-contain object-left md:h-[5.5rem]"
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
                <Link href="/registro/donante" className="block w-full px-4 py-2 text-[#444] text-[13px] font-medium no-underline transition-colors hover:bg-gray-50 hover:text-primary">
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
            <Link href="/registro/donante" className="text-gray-700 no-underline font-medium text-[15px] py-1.5 hover:text-primary transition-colors">
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
          {hospital ? (
            <div className="relative" ref={hospitalRef}>
              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === "hospital" ? null : "hospital")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                aria-label="Cuenta institución"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </button>
              {openMenu === "hospital" && (
                <ul className="absolute right-0 top-full z-[100] mt-1 min-w-48 list-none rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg">
                  <li className="block w-full m-0">
                    <Link
                      href="/hospital/mis-datos"
                      className="block w-full px-4 py-2 text-[13px] font-medium text-[#444] no-underline hover:bg-gray-50 hover:text-primary"
                      onClick={() => setOpenMenu(null)}
                    >
                      Mis datos
                    </Link>
                  </li>
                  <li className="block w-full m-0">
                    <Link
                      href="/hospital/mis-campanias"
                      className="block w-full px-4 py-2 text-[13px] font-medium text-[#444] no-underline hover:bg-gray-50 hover:text-primary"
                      onClick={() => setOpenMenu(null)}
                    >
                      Mis campañas
                    </Link>
                  </li>
                  <li className="block w-full m-0">
                    <button
                      type="button"
                      onClick={handleLogoutHospital}
                      className="block w-full px-4 py-2 text-left text-[13px] font-medium text-[#444] hover:bg-gray-50 hover:text-primary"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : user ? (
            <div className="relative" ref={usuarioRef}>
              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === "usuario" ? null : "usuario")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                aria-label="Mi cuenta"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              {openMenu === "usuario" && (
                <ul className="absolute right-0 top-full z-[100] mt-1 min-w-48 list-none rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg">
                  <li className="block w-full m-0">
                    <Link
                      href="/mis-datos"
                      className="block w-full px-4 py-2 text-[13px] font-medium text-[#444] no-underline hover:bg-gray-50 hover:text-primary"
                      onClick={() => setOpenMenu(null)}
                    >
                      Mis datos
                    </Link>
                  </li>
                  <li className="block w-full m-0">
                    <Link
                      href="/usuario/mis-campanias"
                      className="block w-full px-4 py-2 text-[13px] font-medium text-[#444] no-underline hover:bg-gray-50 hover:text-primary"
                      onClick={() => setOpenMenu(null)}
                    >
                      Mis campañas
                    </Link>
                  </li>
                  <li className="block w-full m-0">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-[13px] font-medium text-[#444] hover:bg-gray-50 hover:text-primary"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="relative" ref={registroRef}>
              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === "registro" ? null : "registro")}
                className={`${poppins.className} inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90`}
              >
                REGÍSTRATE
              </button>
              {openMenu === "registro" && (
                <ul className="absolute right-0 top-full z-[100] mt-1 min-w-48 list-none rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg">
                  <li className="block w-full m-0">
                    <Link
                      href="/registro/donante"
                      className="block w-full px-4 py-2 text-[13px] font-medium text-[#444] no-underline hover:bg-gray-50 hover:text-primary"
                      onClick={() => setOpenMenu(null)}
                    >
                      Usuario/Donante
                    </Link>
                  </li>
                  <li className="block w-full m-0">
                    <Link
                      href="/registro/hospital"
                      className="block w-full px-4 py-2 text-[13px] font-medium text-[#444] no-underline hover:bg-gray-50 hover:text-primary"
                      onClick={() => setOpenMenu(null)}
                    >
                      Institución
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
