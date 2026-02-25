"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contextos/AuthContext";
import { updateMe, changePassword } from "@/lib/auth";

const GRUPOS = ["A", "B", "AB", "O"] as const;
const FACTORES = ["positivo", "negativo"] as const;
const SEXOS = ["Masculino", "Femenino"] as const;

function formatDateForInput(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}

export default function MisDatosPage() {
  const router = useRouter();
  const { user, token, loading: authLoading, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    grupo_sanguineo: "A",
    factor_rh: "positivo",
    fecha_nacimiento: "",
    sexo: "Masculino",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!authLoading && !user && !token) {
      router.push("/registro/donante");
      return;
    }
    if (user) {
      setForm({
        nombre: user.nombre,
        apellido: user.apellido,
        grupo_sanguineo: user.grupo_sanguineo,
        factor_rh: user.factor_rh,
        fecha_nacimiento: formatDateForInput(user.fecha_nacimiento),
        sexo: user.sexo,
      });
    }
  }, [user, authLoading, token, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await updateMe(token, {
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        grupo_sanguineo: form.grupo_sanguineo,
        factor_rh: form.factor_rh,
        fecha_nacimiento: form.fecha_nacimiento,
        sexo: form.sexo,
      });
      await refreshUser();
      setMessage("Datos actualizados correctamente.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar");
    } finally {
      setLoading(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    if (newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await changePassword(token, oldPassword, newPassword);
      setMessage("Contraseña actualizada correctamente.");
      setShowPassword(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || (!user && token)) {
    return (
      <main className="flex min-h-[40vh] items-center justify-center px-4">
        <p className="text-gray-500">Cargando…</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-[60vh] px-4 py-12">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-2 text-3xl font-bold text-primary">Mis datos</h1>
        <p className="mb-8 text-gray-600">Modificá tu información personal. DNI y correo no se pueden cambiar.</p>

        <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-600"><span className="font-medium">DNI:</span> {user.dni}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Correo:</span> {user.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-gray-700">Nombre</label>
              <input
                id="nombre"
                type="text"
                value={form.nombre}
                onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
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
                onChange={(e) => setForm((p) => ({ ...p, apellido: e.target.value }))}
                required
                minLength={2}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label htmlFor="fecha_nacimiento" className="mb-1 block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
            <input
              id="fecha_nacimiento"
              type="date"
              value={form.fecha_nacimiento}
              onChange={(e) => setForm((p) => ({ ...p, fecha_nacimiento: e.target.value }))}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="grupo_sanguineo" className="mb-1 block text-sm font-medium text-gray-700">Grupo sanguíneo</label>
              <select
                id="grupo_sanguineo"
                value={form.grupo_sanguineo}
                onChange={(e) => setForm((p) => ({ ...p, grupo_sanguineo: e.target.value }))}
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
                onChange={(e) => setForm((p) => ({ ...p, factor_rh: e.target.value }))}
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
              onChange={(e) => setForm((p) => ({ ...p, sexo: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {SEXOS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          {message && <p className="rounded-lg bg-green-50 p-3 text-sm text-green-800">{message}</p>}
          {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary py-3 font-semibold text-white hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Guardando…" : "Guardar cambios"}
          </button>
        </form>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-primary hover:underline"
          >
            {showPassword ? "Ocultar cambio de contraseña" : "Cambiar mi contraseña"}
          </button>
          {showPassword && (
            <form onSubmit={handleChangePassword} className="mt-4 flex flex-col gap-4">
              <div>
                <label htmlFor="oldPassword" className="mb-1 block text-sm font-medium text-gray-700">Contraseña actual</label>
                <input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="mb-1 block text-sm font-medium text-gray-700">Nueva contraseña</label>
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
                <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">Confirmar nueva contraseña</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full border-2 border-primary py-2.5 font-semibold text-primary hover:bg-red-50 disabled:opacity-60"
              >
                Cambiar contraseña
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
