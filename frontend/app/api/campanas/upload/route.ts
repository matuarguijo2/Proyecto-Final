import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("imagen");
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No se envió ninguna imagen" },
        { status: 400 }
      );
    }
    if (!file.type.startsWith("image/") || !ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Formato no válido. Use JPEG, PNG, WebP o GIF." },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "La imagen no debe superar 5 MB" },
        { status: 400 }
      );
    }
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
    const filename = `${crypto.randomUUID()}.${safeExt}`;
    const dir = path.join(process.cwd(), "public", "uploads", "campanas");
    await mkdir(dir, { recursive: true });
    const filePath = path.join(dir, filename);
    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));
    const url = `/uploads/campanas/${filename}`;
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json(
      { error: "Error al subir la imagen" },
      { status: 500 }
    );
  }
}
