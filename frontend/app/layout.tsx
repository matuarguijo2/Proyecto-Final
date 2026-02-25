import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "../componentes/navbar";
import Footer from "../componentes/Footer";
import { AuthProvider } from "../contextos/AuthContext";
import { HospitalAuthProvider } from "../contextos/HospitalAuthContext";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gota de Sangre",
  description: "Esta la pagina principal de Gota de Sangre",
  icons: {
    icon: "/img/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <AuthProvider>
          <HospitalAuthProvider>
            <Navbar />
            {children}
            <Footer />
          </HospitalAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
