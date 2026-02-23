"use client";

import { useState } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });

type FormState = {
  // Sección 1 - Datos del Receptor
  nombreApellido: string;
  dni: string;
  grupoSanguineoRh: string;
  cantidadDadores: string;
  // Sección 2 - Centro de Salud
  nombreCentro: string;
  direccionCompleta: string;
  horariosDias: string;
  fechaLimiteAnio: string;
  fechaLimiteMes: string;
  fechaLimiteDia: string;
  // Sección 3 - Campaña y Contacto
  tituloAsunto: string;
  descripcionRequisitos: string;
  telefonoEmailOrganizador: string;
  imagenUrl: string;
};

const initialForm: FormState = {
  nombreApellido: "",
  dni: "",
  grupoSanguineoRh: "",
  cantidadDadores: "",
  nombreCentro: "",
  direccionCompleta: "",
  horariosDias: "",
  fechaLimiteAnio: "",
  fechaLimiteMes: "",
  fechaLimiteDia: "",
  tituloAsunto: "",
  descripcionRequisitos: "",
  telefonoEmailOrganizador: "",
  imagenUrl: "",
};

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function getDiasDelMes(mes: number, anio: number): number {
  if (mes < 1 || mes > 12) return 31;
  const d = new Date(anio, mes, 0);
  return d.getDate();
}

export default function FormularioCrearCampana() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [errorImagen, setErrorImagen] = useState<string | null>(null);

  const handleImagenChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorImagen(null);
    setSubiendoImagen(true);
    try {
      const formData = new FormData();
      formData.append("imagen", file);
      const res = await fetch("/api/campanas/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir la imagen");
      update("imagenUrl", data.url);
    } catch (err) {
      setErrorImagen(err instanceof Error ? err.message : "Error al subir la imagen");
    } finally {
      setSubiendoImagen(false);
      e.target.value = "";
    }
  };

  const anioActual = new Date().getFullYear();
  const anios = Array.from({ length: 5 }, (_, i) => anioActual + i);
  const diasMax = form.fechaLimiteAnio && form.fechaLimiteMes
    ? getDiasDelMes(parseInt(form.fechaLimiteMes, 10) + 1, parseInt(form.fechaLimiteAnio, 10))
    : 31;

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validar = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.nombreApellido.trim()) e.nombreApellido = "Requerido.";
    if (!form.dni.trim()) e.dni = "Requerido.";
    if (!form.grupoSanguineoRh.trim()) e.grupoSanguineoRh = "Requerido.";
    if (!form.cantidadDadores.trim()) e.cantidadDadores = "Requerido.";
    if (!form.nombreCentro.trim()) e.nombreCentro = "Requerido.";
    if (!form.direccionCompleta.trim()) e.direccionCompleta = "Requerido.";
    if (!form.horariosDias.trim()) e.horariosDias = "Requerido.";
    if (!form.fechaLimiteAnio) e.fechaLimiteAnio = "Requerido.";
    if (!form.fechaLimiteMes) e.fechaLimiteMes = "Requerido.";
    if (!form.fechaLimiteDia) e.fechaLimiteDia = "Requerido.";
    if (!form.tituloAsunto.trim()) e.tituloAsunto = "Requerido.";
    if (!form.descripcionRequisitos.trim()) e.descripcionRequisitos = "Requerido.";
    if (!form.telefonoEmailOrganizador.trim()) e.telefonoEmailOrganizador = "Requerido.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validar()) return;
    setErrorEnvio(null);
    setEnviando(true);
    try {
      const res = await fetch("/api/campanas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error al enviar la campaña");
      }
      setEnviado(true);
    } catch (err) {
      setErrorEnvio(err instanceof Error ? err.message : "Error al enviar la campaña");
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="mx-auto max-w-[1200px] px-8 py-12">
        <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
          <h2 className="mb-2 text-2xl font-semibold text-primary">Campaña enviada</h2>
          <p className="mb-6 text-gray-700">Tu solicitud de campaña de donación ha sido recibida correctamente.</p>
          <Link
            href="/involucrate"
            className={`${poppins.className} inline-flex rounded-full bg-primary px-6 py-3 text-white no-underline hover:opacity-95`}
          >
            Volver a Involúcrate
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-8 py-8">
      <div className="mb-8">
        <Link href="/involucrate" className="text-primary no-underline hover:underline">
          ← Volver a Involúcrate
        </Link>
      </div>

      <h1 className="mb-8 text-[2.5rem] text-primary">Crear campaña de donación</h1>

      {errorEnvio && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {errorEnvio}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Sección 1 - Datos del Receptor */}
        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">Datos del receptor (paciente)</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Nombre y apellido completo *</label>
              <input
                type="text"
                required
                value={form.nombreApellido}
                onChange={(e) => update("nombreApellido", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej. Juan Pérez"
              />
              {errors.nombreApellido && <p className="mt-1 text-sm text-red-600">{errors.nombreApellido}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">DNI *</label>
              <input
                type="text"
                required
                value={form.dni}
                onChange={(e) => update("dni", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej. 12345678"
              />
              {errors.dni && <p className="mt-1 text-sm text-red-600">{errors.dni}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Grupo sanguíneo y factor RH requerido *</label>
              <input
                type="text"
                required
                value={form.grupoSanguineoRh}
                onChange={(e) => update("grupoSanguineoRh", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej. O+, A-, B+"
              />
              {errors.grupoSanguineoRh && <p className="mt-1 text-sm text-red-600">{errors.grupoSanguineoRh}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Cantidad de dadores necesarios *</label>
              <input
                type="text"
                required
                value={form.cantidadDadores}
                onChange={(e) => update("cantidadDadores", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej. 5"
              />
              {errors.cantidadDadores && <p className="mt-1 text-sm text-red-600">{errors.cantidadDadores}</p>}
            </div>
          </div>
        </section>

        {/* Sección 2 - Centro de Salud */}
        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">Datos del centro de salud (dónde donar)</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Nombre del hospital / clínica / centro de hemoterapia *</label>
              <input
                type="text"
                required
                value={form.nombreCentro}
                onChange={(e) => update("nombreCentro", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej. Hospital General"
              />
              {errors.nombreCentro && <p className="mt-1 text-sm text-red-600">{errors.nombreCentro}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Dirección completa *</label>
              <input
                type="text"
                required
                value={form.direccionCompleta}
                onChange={(e) => update("direccionCompleta", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Calle, número, ciudad, provincia"
              />
              {errors.direccionCompleta && <p className="mt-1 text-sm text-red-600">{errors.direccionCompleta}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Horarios y días de atención *</label>
              <input
                type="text"
                required
                value={form.horariosDias}
                onChange={(e) => update("horariosDias", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej. Lunes a Viernes 8:00 a 14:00"
              />
              {errors.horariosDias && <p className="mt-1 text-sm text-red-600">{errors.horariosDias}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Fecha límite *</label>
              <div className="flex gap-2">
                <select
                  required
                  value={form.fechaLimiteDia}
                  onChange={(e) => update("fechaLimiteDia", e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Día</option>
                  {Array.from({ length: diasMax }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select
                  required
                  value={form.fechaLimiteMes}
                  onChange={(e) => update("fechaLimiteMes", e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Mes</option>
                  {MESES.map((nombre, i) => (
                    <option key={i} value={i}>{nombre}</option>
                  ))}
                </select>
                <select
                  required
                  value={form.fechaLimiteAnio}
                  onChange={(e) => update("fechaLimiteAnio", e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Año</option>
                  {anios.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              {(errors.fechaLimiteDia || errors.fechaLimiteMes || errors.fechaLimiteAnio) && (
                <p className="mt-1 text-sm text-red-600">Seleccione día, mes y año.</p>
              )}
            </div>
          </div>
        </section>

        {/* Sección 3 - Campaña y Contacto */}
        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">Información de la campaña y contacto</h2>
          <div className="grid gap-6 sm:grid-cols-1">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Título o asunto *</label>
              <input
                type="text"
                required
                value={form.tituloAsunto}
                onChange={(e) => update("tituloAsunto", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej. Campaña para María - Sangre tipo O+"
              />
              {errors.tituloAsunto && <p className="mt-1 text-sm text-red-600">{errors.tituloAsunto}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Descripción / requisitos extra *</label>
              <textarea
                required
                rows={4}
                value={form.descripcionRequisitos}
                onChange={(e) => update("descripcionRequisitos", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Indique requisitos adicionales para donantes o descripción de la campaña."
              />
              {errors.descripcionRequisitos && <p className="mt-1 text-sm text-red-600">{errors.descripcionRequisitos}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Imagen de la campaña (opcional)</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImagenChange}
                disabled={subiendoImagen}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:opacity-90 disabled:opacity-60"
              />
              {subiendoImagen && <p className="mt-1 text-sm text-gray-500">Subiendo imagen…</p>}
              {errorImagen && <p className="mt-1 text-sm text-red-600">{errorImagen}</p>}
              {form.imagenUrl && (
                <div className="mt-3 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element -- vista previa de subida dinámica */}
                  <img
                    src={form.imagenUrl}
                    alt="Vista previa campaña"
                    className="h-24 w-24 rounded-lg object-cover border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => update("imagenUrl", "")}
                    className="text-sm text-primary hover:underline"
                  >
                    Quitar imagen
                  </button>
                </div>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Teléfono o email del organizador *</label>
              <input
                type="text"
                required
                value={form.telefonoEmailOrganizador}
                onChange={(e) => update("telefonoEmailOrganizador", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ej. 11 1234-5678 o contacto@ejemplo.com"
              />
              {errors.telefonoEmailOrganizador && <p className="mt-1 text-sm text-red-600">{errors.telefonoEmailOrganizador}</p>}
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            disabled={enviando}
            className={`${poppins.className} inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-base font-extrabold text-white shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all duration-[120ms] hover:-translate-y-0.5 hover:opacity-95 disabled:opacity-60 disabled:pointer-events-none`}
          >
            {enviando ? "Enviando…" : "Enviar campaña"}
          </button>
          <Link
            href="/involucrate"
            className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3.5 text-gray-700 no-underline hover:bg-gray-50"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
