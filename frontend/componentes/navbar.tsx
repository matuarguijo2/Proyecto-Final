"use client";
import Link from "next/link";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { Poppins } from "next/font/google";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });
const poppins = Poppins({ weight: "600", subsets: ["latin"] });

export default function Navbar() {
  return (
    <nav className={`navbar ${roboto.className}`}>
      <div className="inner">
        <div className="left">
          <Link href="/" className="logo">
            {/* usar la ruta pública en lugar de importar desde /public */}
            <Image
              src="/img/logo.png"
              alt="Gota Sangre logo"
              width={150}
              height={40}
              priority
            />
          </Link>
        </div>

        <ul className="navlinks">
          <li className="dropdown-item">
            <Link href="/involucrate" className="nav-link">
              Involúcrate
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link href="/serdonante" className="dropdown-link">
                  Conviértete en donante
                </Link>
              </li>
              <li>
                <Link href="/formas-ayuda" className="dropdown-link">
                  Formas de ayudar
                </Link>
              </li>
              <li>
                <Link href="/pacientes" className="dropdown-link">
                  Pacientes
                </Link>
              </li>
            </ul>
          </li>
          <li className="dropdown-item">
            <Link href="/conocemas" className="nav-link">
              Conoce Más
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link href="/acerca-de-nosotros" className="dropdown-link">
                  Acerca de nosotros
                </Link>
              </li>
              <li>
                <Link href="/cancer-de-sangre" className="dropdown-link">
                  Cáncer de sangre
                </Link>
              </li>
            </ul>
          </li>
          <li className="dropdown-item">
            <Link href="/serdonante" className="nav-link">
              Ser Donante
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link href="/requisitos-donante" className="dropdown-link">
                  Buscando la compatibilidad perfecta
                </Link>
              </li>
              <li>
                <Link href="/preparacion-donacion" className="dropdown-link">
                  Preparándose para donar
                </Link>
              </li>
              <li>
                <Link href="/post-donacion" className="dropdown-link">
                  Qué hacer después de la donación
                </Link>
              </li>
              <li>
                <Link href="/tiempo-donacion" className="dropdown-link">
                  ¿Cuánto tiempo tarda?
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        <div className="actions">
          <Link href="/registro" className={`${poppins.className} btn btn-red`}>
            REGÍSTRATE
          </Link>
          <Link href="/aporte" className={`${poppins.className} btn btn-green`}>
            HAZ TU APORTE
          </Link>
        </div>
      </div>

      { /* changed code: estilos actualizados para botones más pequeños */ }
      <style jsx>{`
        .navbar {
          border-bottom: 1px solid #e6e6e6;
          background: #fff;
        }
        .inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .logo {
          display: flex;
          align-items: center;
          height: 40px;            /* mantiene la altura de la fila */
          overflow: visible;       /* permite que el logo ampliado sobresalga sin forzar el alto */
        }
        .logo :global(span) {
          display: inline-block;
          line-height: 0;
          height: 40px;           /* caja de referencia fija */
          overflow: visible;
        }
        .logo :global(img) {
          max-height: 40px;       /* mantiene la caja de layout igual */
          width: auto;
          display: block;
          transform-origin: left center;
          transform: scale(1.45); /* escala visual sin aumentar la caja del navbar */
        }
        .navlinks {
          display: flex;
          gap: 18px;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
        }

        /* Reglas más específicas para forzar color negro en los enlaces del navbar */
        .navbar .navlinks .nav-link,
        .navbar .navlinks a,
        :global(.nav-link),
        :global(.navlinks) a {
          color: #000 !important;
          text-decoration: none !important;
          font-weight: 500 !important;
          font-size: 20px !important; /* <- tamaño solicitado */
        }

        .actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        /* Botones más pequeños pero aún redondeados */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 16px;      /* reducido */
          border-radius: 9999px;
          font-weight: 800;
          text-decoration: none;
          color: #fff !important;
          font-size: 14px;         /* reducido */
          line-height: 1;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
          transition: transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease;
          background: transparent;
        }

        /* FORZAR tamaño y radio para vencer global.css (valores más pequeños) */
        .navbar :global(.btn) {
          padding: 12px 20px !important;
          border-radius: 9999px !important;
          font-size: 15px !important;
        }
        .navbar :global(.btn:hover) {
          transform: translateY(-2px) !important;
        }

        /* Forzar fondos específicos con prioridad */
        :global(.btn-red) {
          background: #e04b44 !important;
          color: #fff !important;
        }
        :global(.btn-green) {
          background: #3bb24a !important;
          color: #fff !important;
        }

        /* Asegurar que los enlaces dentro de .actions no tengan estilo por defecto */
        .actions a {
          text-decoration: none !important;
          color: inherit !important;
        }

        /* Definición del Dropdown */
        .dropdown-item {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%; /* Justo debajo del item */
          left: 0;
          background-color: #ffffff;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          border-radius: 8px;
          padding: 8px 0;
          min-width: 240px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
          gap: 0;
          flex-direction: column;
          display: flex;
          z-index: 100;
        }

        .dropdown-item:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-menu li {
          width: 100%;
          margin: 0;
          display: block;
        }

        /* Estilos para los enlaces del dropdown */
        /* Nota: Usamos :global para asegurar que aplicamos sobre el Link/a de Next.js */
        .dropdown-menu :global(.dropdown-link) {
          display: block;
          padding: 12px 20px;
          color: #333 !important;
          font-size: 15px !important;
          font-weight: 500 !important;
          text-decoration: none !important;
          transition: background-color 0.2s ease, color 0.2s ease;
          width: 100%;
        }

        .dropdown-menu :global(.dropdown-link:hover) {
          background-color: #f5f5f5;
          color: #e04b44 !important; /* Color rojo de la marca */
        }

        @media (max-width: 720px) {
          .navlinks {
            display: none;
          }
          .logo :global(img) {
            height: 34px;
          }
          .btn {
            padding: 10px 16px;
            font-size: 14px;
          }
        }
      `}</style>
    </nav>
  );
}