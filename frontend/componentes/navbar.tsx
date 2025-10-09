import Link from "next/link";

export default function Navbar() {
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