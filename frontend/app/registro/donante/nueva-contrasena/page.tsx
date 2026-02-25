"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/auth";

function NuevaContrasenaForm() {
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token") ?? "";
  const [token, setToken] = useState(tokenFromUrl);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!token.trim()) {
      setError("El token es obligatorio. Revisá el enlace que te enviamos o la consola del servidor.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(token.trim(), newPassword);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al restablecer la contraseña");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md">
        <h1 className="mb-2 text-3xl font-bold text-primary">Contraseña actualizada</h1>
        <p className="mb-6 text-gray-600">Tu contraseña fue restablecida correctamente. Ya podés iniciar sesión.</p>
        <Link
          href="/registro/donante"
          className="inline-block rounded-full bg-primary px-6 py-2.5 font-medium text-white no-underline hover:opacity-95"
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-2 text-3xl font-bold text-primary">Nueva contraseña</h1>
      <p className="mb-8 text-gray-600">
        Ingresá el token que recibiste (o el que aparece en la consola del servidor) y tu nueva contraseña.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="token" className="mb-1 block text-sm font-medium text-gray-700">Token</label>
          <input
            id="token"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Pegá aquí el token del correo o consola"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="mb-1 block text-sm font-medium text-gray-700">Nueva contraseña (mín. 6 caracteres)</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">Confirmar contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? "Guardando…" : "Restablecer contraseña"}
        </button>
      </form>
      <p className="mt-8">
        <Link href="/registro/donante" className="text-primary hover:underline">
          ← Volver a iniciar sesión
        </Link>
      </p>
    </div>
  );
}

export default function NuevaContrasenaPage() {
  return (
    <main className="min-h-[60vh] px-4 py-12">
      <Suspense fallback={<p className="text-center text-gray-500">Cargando…</p>}>
        <NuevaContrasenaForm />
      </Suspense>
    </main>
  );
}
