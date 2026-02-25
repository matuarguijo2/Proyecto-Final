"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHospitalAuth } from "@/contextos/HospitalAuthContext";
import { updateMeHospital, changePasswordHospital } from "@/lib/authHospital";

const TIPOS = ["Publico", "Privado"] as const;

export default function MisDatosHospitalPage() {
  const router = useRouter();
  const { hospital, token, loading: authLoading, refreshHospital } = useHospitalAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState<{
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    tipo: "Publico" | "Privado";
    horario_atencion: string;
  }>({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    tipo: "Publico",
    horario_atencion: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!authLoading && !hospital) {
      router.push("/registro/hospital/login");
      return;
    }
    if (hospital) {
      setForm({
        nombre: hospital.nombre,
        direccion: hospital.direccion,
        telefono: String(hospital.telefono),
        email: hospital.email,
        tipo: (hospital.tipo as "Publico" | "Privado") || "Publico",
        horario_atencion: hospital.horario_atencion,
      });
    }
  }, [hospital, authLoading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await updateMeHospital(token, {
        nombre: form.nombre.trim(),
        direccion: form.direccion.trim(),
        telefono: parseInt(form.telefono, 10),
        email: form.email.trim(),
        tipo: form.tipo,
        horario_atencion: form.horario_atencion.trim(),
      });
      await refreshHospital();
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
      await changePasswordHospital(token, oldPassword, newPassword);
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

  if (authLoading || !hospital) {
    return (
      <main className="min-h-[60vh] px-4 py-12">
        <div className="mx-auto max-w-lg text-center text-gray-600">Cargando…</div>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] px-4 py-12">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-2 text-3xl font-bold text-primary">Mis datos (Institución)</h1>
        <p className="mb-8 text-gray-600">Modificá los datos de tu institución.</p>

        {message && (
          <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">{message}</p>
        )}
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Nombre de la institución</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Dirección</label>
            <input
              type="text"
              value={form.direccion}
              onChange={(e) => setForm((p) => ({ ...p, direccion: e.target.value }))}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                type="text"
                inputMode="numeric"
                value={form.telefono}
                onChange={(e) => setForm((p) => ({ ...p, telefono: e.target.value.replace(/\D/g, "") }))}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tipo</label>
            <select
              value={form.tipo}
              onChange={(e) => setForm((p) => ({ ...p, tipo: e.target.value as "Publico" | "Privado" }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {TIPOS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Horario de atención</label>
            <input
              type="text"
              value={form.horario_atencion}
              onChange={(e) => setForm((p) => ({ ...p, horario_atencion: e.target.value }))}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary py-3 font-semibold text-white hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Guardando…" : "Guardar cambios"}
          </button>
        </form>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Cambiar contraseña</h2>
          {!showPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(true)}
              className="text-primary hover:underline"
            >
              Cambiar contraseña
            </button>
          ) : (
            <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Contraseña actual</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Nueva contraseña</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Confirmar nueva contraseña</label>
                <input
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
                Actualizar contraseña
              </button>
            </form>
          )}
        </div>

        <p className="mt-8">
          <Link href="/hospital/mis-campanias" className="text-primary hover:underline">
            ← Mis campañas
          </Link>
        </p>
      </div>
    </main>
  );
}
