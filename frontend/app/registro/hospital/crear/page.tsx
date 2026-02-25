"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signupHospital, setStoredTokenHospital } from "@/lib/authHospital";
import { useHospitalAuth } from "@/contextos/HospitalAuthContext";

const TIPOS = ["Publico", "Privado"] as const;

export default function CrearHospitalPage() {
  const router = useRouter();
  const { refreshHospital } = useHospitalAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    usuario: "",
    password: "",
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    tipo: "Publico" as const,
    horario_atencion: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    const telefonoNum = parseInt(form.telefono, 10);
    if (Number.isNaN(telefonoNum) || form.telefono.trim() === "") {
      setError("El teléfono debe ser un número válido.");
      return;
    }
    setLoading(true);
    try {
      const { accessToken } = await signupHospital({
        usuario: form.usuario.trim(),
        password: form.password,
        nombre: form.nombre.trim(),
        direccion: form.direccion.trim(),
        telefono: telefonoNum,
        email: form.email.trim().toLowerCase(),
        tipo: form.tipo,
        horario_atencion: form.horario_atencion.trim(),
      });
      setStoredTokenHospital(accessToken);
      await refreshHospital();
      router.push("/hospital/mis-campanias");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en el registro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[60vh] px-4 py-12">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-2 text-3xl font-bold text-primary">Registrar institución</h1>
        <p className="mb-8 text-gray-600">Completá los datos de la institución. Todos los campos son obligatorios.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="usuario" className="mb-1 block text-sm font-medium text-gray-700">Nombre de usuario</label>
            <input
              id="usuario"
              type="text"
              value={form.usuario}
              onChange={(e) => update("usuario", e.target.value)}
              required
              minLength={3}
              autoComplete="username"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Contraseña (mín. 6 caracteres)</label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-gray-700">Nombre de la institución</label>
            <input
              id="nombre"
              type="text"
              value={form.nombre}
              onChange={(e) => update("nombre", e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="direccion" className="mb-1 block text-sm font-medium text-gray-700">Dirección</label>
            <input
              id="direccion"
              type="text"
              value={form.direccion}
              onChange={(e) => update("direccion", e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="telefono" className="mb-1 block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                id="telefono"
                type="text"
                inputMode="numeric"
                value={form.telefono}
                onChange={(e) => update("telefono", e.target.value.replace(/\D/g, ""))}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label htmlFor="tipo" className="mb-1 block text-sm font-medium text-gray-700">Tipo</label>
            <select
              id="tipo"
              value={form.tipo}
              onChange={(e) => update("tipo", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {TIPOS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="horario_atencion" className="mb-1 block text-sm font-medium text-gray-700">Horario de atención</label>
            <input
              id="horario_atencion"
              type="text"
              value={form.horario_atencion}
              onChange={(e) => update("horario_atencion", e.target.value)}
              required
              placeholder="Ej. Lunes a Viernes 8 a 18 hs"
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
            {loading ? "Registrando…" : "Registrar institución"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          ¿Ya tenés cuenta?{" "}
          <Link href="/registro/hospital/login" className="font-medium text-primary no-underline hover:underline">
            Iniciar sesión
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
