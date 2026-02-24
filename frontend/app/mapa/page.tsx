"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import type { Hospital } from "./MapaView";

const MapaView = dynamic(() => import("./MapaView"), { ssr: false });

const NOMINATIM_DELAY_MS = 1100; // Nominatim: 1 req/s

async function geocodeAddress(direccion: string): Promise<{ lat: number; lon: number } | null> {
  const query = encodeURIComponent(`${direccion}, Argentina`);
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
    { headers: { "Accept-Language": "es" } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;
  const lat = parseFloat(data[0].lat);
  const lon = parseFloat(data[0].lon);
  return Number.isFinite(lat) && Number.isFinite(lon) ? { lat, lon } : null;
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export default function MapaPage() {
  const [hospitales, setHospitales] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [geocoding, setGeocoding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const geocodeDoneRef = useRef(false);

  useEffect(() => {
    fetch("/api/hospitales")
      .then((res) => res.json())
      .then((data: Hospital[] | { hospitales: Hospital[]; error?: string }) => {
        const list = Array.isArray(data) ? data : data.hospitales ?? [];
        const message = Array.isArray(data) ? null : (data as { error?: string }).error ?? null;
        setHospitales(list);
        if (message) setError(message);
        setLoading(false);
        const sinCoords = list.filter((h) => h.latitude == null || h.longitude == null);
        if (sinCoords.length === 0 || geocodeDoneRef.current) return;
        geocodeDoneRef.current = true;
        setGeocoding(true);
        const run = async () => {
          for (const h of sinCoords) {
            await delay(NOMINATIM_DELAY_MS);
            const coords = await geocodeAddress(h.direccion);
            if (coords) {
              setHospitales((prev) =>
                prev.map((x) =>
                  x.id === h.id ? { ...x, latitude: coords.lat, longitude: coords.lon } : x
                )
              );
              try {
                await fetch(`/api/hospitales/${h.id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ latitude: coords.lat, longitude: coords.lon }),
                });
              } catch {
                // Si falla guardar en backend, las coordenadas ya están en el estado para esta sesión
              }
            }
          }
          setGeocoding(false);
        };
        run();
      })
      .catch(() => setError("No se pudieron cargar los centros. Comprobá que el backend esté en ejecución."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        <h1 className="mb-2 text-[2rem] text-primary">Mapa de centros de donación</h1>
        <p className="mb-8 text-gray-600">
          Ubicación de hospitales, clínicas y centros de hemoterapia donde podés acercarte para obtener información o donar sangre.
        </p>

        {loading ? (
          <div className="flex h-[400px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
            <p className="text-gray-500">Cargando mapa…</p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error}
          </div>
        ) : (
          <>
            {geocoding && (
              <p className="mb-2 text-sm text-gray-500">
                Obteniendo ubicaciones de los centros…
              </p>
            )}
            <div className="mb-8">
              <MapaView hospitales={hospitales} />
            </div>

            <h2 className="mb-4 text-xl font-semibold text-gray-800">Centros de atención</h2>
            {hospitales.length === 0 ? (
              <p className="text-gray-500">No hay centros cargados por el momento.</p>
            ) : (
              <ul className="grid list-none gap-4 p-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {hospitales.map((h) => (
                  <li
                    key={h.id}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <h3 className="mb-2 font-semibold text-primary">{h.nombre}</h3>
                    <p className="mb-1.5 text-sm text-gray-600">
                      <span className="font-medium text-gray-700">Dirección:</span> {h.direccion}
                    </p>
                    <p className="mb-1.5 text-sm text-gray-600">
                      <span className="font-medium text-gray-700">Días y horarios:</span> {h.horario_atencion}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-700">Tel:</span> {h.telefono}
                      {h.email && (
                        <> · <span className="font-medium text-gray-700">Email:</span> {h.email}</>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </main>
  );
}
