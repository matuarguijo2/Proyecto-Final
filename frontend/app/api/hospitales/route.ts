const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/hospitales`, { cache: "no-store" });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return Response.json({
        hospitales: [],
        error: (err as { error?: string }).error || "No se pudieron cargar los centros.",
      });
    }
    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json({
      hospitales: [],
      error: "No se pudo conectar con el servidor. Comprobá que el backend esté en ejecución (puerto 4000) y que las migraciones de Prisma estén aplicadas.",
    });
  }
}
