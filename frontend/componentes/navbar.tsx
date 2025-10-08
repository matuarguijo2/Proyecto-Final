import Link from "next/link";

export default function Navbar() {
  return (  
<nav>
          <img src="/img/logo.png" alt="Logo" />
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