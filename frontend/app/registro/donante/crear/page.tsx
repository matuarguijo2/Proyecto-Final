"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup, setStoredToken } from "@/lib/auth";
import { useAuth } from "@/contextos/AuthContext";

const GRUPOS = ["A", "B", "AB", "O"] as const;
const FACTORES = ["positivo", "negativo"] as const;
const SEXOS = ["Masculino", "Femenino"] as const;

export default function CrearDonantePage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    grupo_sanguineo: "A",
    factor_rh: "positivo",
    fecha_nacimiento: "",
    sexo: "Masculino",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.dni.length !== 8) {
      setError("El DNI debe tener 8 dígitos.");
      return;
    }
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      const { accessToken } = await signup({
        dni: form.dni.trim(),
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        grupo_sanguineo: form.grupo_sanguineo,
        factor_rh: form.factor_rh,
        fecha_nacimiento: new Date(form.fecha_nacimiento).toISOString(),
        sexo: form.sexo,
      });
      setStoredToken(accessToken);
      await refreshUser();
      router.push("/");
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
        <h1 className="mb-2 text-3xl font-bold text-primary">Registrate como donante</h1>
        <p className="mb-8 text-gray-600">Completá todos los datos. Todos los campos son obligatorios.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="dni" className="mb-1 block text-sm font-medium text-gray-700">DNI (8 dígitos)</label>
              <input
                id="dni"
                type="text"
                inputMode="numeric"
                maxLength={8}
                value={form.dni}
                onChange={(e) => update("dni", e.target.value.replace(/\D/g, ""))}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="fecha_nacimiento" className="mb-1 block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
              <input
                id="fecha_nacimiento"
                type="date"
                value={form.fecha_nacimiento}
                onChange={(e) => update("fecha_nacimiento", e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-gray-700">Nombre</label>
              <input
                id="nombre"
                type="text"
                value={form.nombre}
                onChange={(e) => update("nombre", e.target.value)}
                required
                minLength={2}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="apellido" className="mb-1 block text-sm font-medium text-gray-700">Apellido</label>
              <input
                id="apellido"
                type="text"
                value={form.apellido}
                onChange={(e) => update("apellido", e.target.value)}
                required
                minLength={2}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
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
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Contraseña (mínimo 6 caracteres)</label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              required
              minLength={6}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="grupo_sanguineo" className="mb-1 block text-sm font-medium text-gray-700">Grupo sanguíneo</label>
              <select
                id="grupo_sanguineo"
                value={form.grupo_sanguineo}
                onChange={(e) => update("grupo_sanguineo", e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {GRUPOS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="factor_rh" className="mb-1 block text-sm font-medium text-gray-700">Factor RH</label>
              <select
                id="factor_rh"
                value={form.factor_rh}
                onChange={(e) => update("factor_rh", e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {FACTORES.map((f) => (
                  <option key={f} value={f}>{f === "positivo" ? "Positivo" : "Negativo"}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="sexo" className="mb-1 block text-sm font-medium text-gray-700">Sexo</label>
            <select
              id="sexo"
              value={form.sexo}
              onChange={(e) => update("sexo", e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {SEXOS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary py-3 font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Registrando…" : "Registrarme"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          ¿Ya tenés cuenta?{" "}
          <Link href="/registro/donante" className="font-medium text-primary hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
