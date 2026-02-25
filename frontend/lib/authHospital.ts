const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type Hospital = {
  id: number;
  nombre: string;
  direccion: string;
  telefono: number;
  email: string;
  tipo: string;
  horario_atencion: string;
  isActive: boolean;
  latitude: number | null;
  longitude: number | null;
  usuario: string | null;
  createdAt?: string;
};

export async function loginHospital(
  usuario: string,
  password: string
): Promise<{ accessToken: string }> {
  const res = await fetch(`${getApiUrl()}/api/auth/hospital/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario: usuario.trim(), password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al iniciar sesión");
  return data;
}

export async function signupHospital(body: {
  usuario: string;
  password: string;
  nombre: string;
  direccion: string;
  telefono: number;
  email: string;
  tipo: string;
  horario_atencion: string;
  latitude?: number;
  longitude?: number;
}): Promise<{ accessToken: string }> {
  const res = await fetch(`${getApiUrl()}/api/auth/hospital/signup`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error en el registro");
  return data;
}

export async function logoutHospital(): Promise<void> {
  await fetch(`${getApiUrl()}/api/auth/hospital/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function getMeHospital(token: string): Promise<Hospital> {
  const res = await fetch(`${getApiUrl()}/api/auth/hospital/getme`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener el perfil");
  return data;
}

export async function updateMeHospital(
  token: string,
  body: Partial<{
    nombre: string;
    direccion: string;
    telefono: number;
    email: string;
    tipo: string;
    horario_atencion: string;
    latitude: number;
    longitude: number;
  }>
): Promise<Hospital> {
  const res = await fetch(`${getApiUrl()}/api/auth/hospital/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al actualizar");
  return data;
}

export async function changePasswordHospital(
  token: string,
  oldPassword: string,
  newPassword: string
): Promise<void> {
  const res = await fetch(`${getApiUrl()}/api/auth/hospital/changepassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({ oldPassword, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al cambiar la contraseña");
}

export function getStoredTokenHospital(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authTokenHospital");
}

export function setStoredTokenHospital(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("authTokenHospital", token);
}

export function clearStoredTokenHospital(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authTokenHospital");
}
