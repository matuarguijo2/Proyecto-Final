"use client";

import { useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type Hospital = {
  id: number;
  nombre: string;
  direccion: string;
  telefono: number;
  email: string;
  tipo: string;
  horario_atencion: string;
  latitude: number | null;
  longitude: number | null;
};

const DEFAULT_CENTER: [number, number] = [-34.6037, -58.3816]; // Buenos Aires
const DEFAULT_ZOOM = 11;

type MapaViewProps = {
  hospitales: Hospital[];
};

export default function MapaView({ hospitales }: MapaViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const withCoords = useMemo(
    () => hospitales.filter((h) => h.latitude != null && h.longitude != null) as (Hospital & { latitude: number; longitude: number })[],
    [hospitales]
  );

  // Crear el mapa una sola vez
  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current).setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    mapRef.current = map;
    markersRef.current = layerGroup;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
  }, []);

  // Actualizar marcadores cuando cambian los centros con coordenadas
  useEffect(() => {
    const map = mapRef.current;
    const layerGroup = markersRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    const icon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    withCoords.forEach((h) => {
      L.marker([h.latitude, h.longitude], { icon })
        .addTo(layerGroup)
        .bindPopup(
          `<strong>${escapeHtml(h.nombre)}</strong><br/>${escapeHtml(h.direccion)}${h.horario_atencion ? `<br/><small>${escapeHtml(h.horario_atencion)}</small>` : ""}`
        );
    });

    if (withCoords.length > 1) {
      const bounds = L.latLngBounds(withCoords.map((h) => [h.latitude, h.longitude] as [number, number]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    } else if (withCoords.length === 1) {
      map.setView([withCoords[0].latitude, withCoords[0].longitude], 14);
    }
  }, [withCoords]);

  return (
    <div
      ref={containerRef}
      className="h-[400px] w-full rounded-xl border border-gray-200 bg-gray-100"
      style={{ minHeight: "400px" }}
    />
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
