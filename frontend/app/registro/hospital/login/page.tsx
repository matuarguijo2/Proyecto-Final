"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHospitalAuth } from "@/contextos/HospitalAuthContext";

export default function LoginHospitalPage() {
  const router = useRouter();
  const { login } = useHospitalAuth();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(usuario.trim(), password);
      router.push("/hospital/mis-campanias");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[60vh] px-4 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="mb-2 text-3xl font-bold text-primary">
          Iniciá sesión (Institución)
        </h1>
        <p className="mb-8 text-gray-600">
          Ingresá con tu nombre de usuario y contraseña para acceder al panel de la institución.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="usuario" className="mb-1 block text-sm font-medium text-gray-700">
              Nombre de usuario
            </label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary py-3 font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Iniciando sesión…" : "Iniciar sesión"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          ¿Tu institución aún no está registrada?{" "}
          <Link
            href="/registro/hospital/crear"
            className="font-medium text-primary no-underline hover:underline"
          >
            Registrá tu institución
          </Link>
        </p>
        <p className="mt-2 text-center">
          <Link href="/registro/hospital" className="text-sm text-gray-500 no-underline hover:underline">
            ← Volver
          </Link>
        </p>
      </div>
    </main>
  );
}
