"use client";

import { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/lib/auth";

export default function OlvideContrasenaPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <main className="min-h-[60vh] px-4 py-12">
        <div className="mx-auto max-w-md">
          <h1 className="mb-2 text-3xl font-bold text-primary">Revisá tu correo</h1>
          <p className="mb-6 text-gray-600">
            Si existe una cuenta con ese correo, en desarrollo el enlace para restablecer la contraseña aparece en la consola del servidor (backend). En producción se enviaría por email.
          </p>
          <p className="mb-4 text-sm text-gray-600">
            Para restablecer la contraseña, necesitás el token que se generó. Si lo tenés, podés ir directamente a la página de nueva contraseña.
          </p>
          <Link
            href="/registro/donante/nueva-contrasena"
            className="inline-block rounded-full bg-primary px-6 py-2.5 font-medium text-white no-underline hover:opacity-95"
          >
            Ir a restablecer contraseña con token
          </Link>
          <p className="mt-8">
            <Link href="/registro/donante" className="text-primary hover:underline">
              ← Volver a iniciar sesión
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] px-4 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="mb-2 text-3xl font-bold text-primary">Olvidé mi contraseña</h1>
        <p className="mb-8 text-gray-600">
          Ingresá tu correo y te indicamos cómo restablecer tu contraseña.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary py-3 font-semibold text-white hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Enviando…" : "Enviar"}
          </button>
        </form>
        <p className="mt-8">
          <Link href="/registro/donante" className="text-primary hover:underline">
            ← Volver a iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
