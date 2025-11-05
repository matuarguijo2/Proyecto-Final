"use client";
import Link from "next/link";
import Image from "next/image";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

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
          <li>
            <Link href="/involucrate" className="nav-link">
              Involúcrate
            </Link>
          </li>
          <li>
            <Link href="/conocemas" className="nav-link">
              Conoce Más
            </Link>
          </li>
          <li>
            <Link href="/serdonante" className="nav-link">
              Ser Donante
            </Link>
          </li>
        </ul>

        <div className="actions">
          <Link href="/registro" className="btn btn-red">
            REGÍSTRATE
          </Link>
          <Link href="/aporte" className="btn btn-green">
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

  return (  
<nav>
          <ul>
            <li>
              <Link href="/involucrate">Involucrate</Link>
            </li>
            <li>
              <Link href="/conocemas">Conoce Más</Link>
            </li>
            <li>
              <Link href="/serdonante">Ser Donante</Link>
            </li>
          </ul>
        </nav>
    );
}