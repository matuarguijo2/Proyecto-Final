const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type Donante = {
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  grupo_sanguineo: string;
  factor_rh: string;
  fecha_nacimiento: string;
  sexo: string;
  isActive: boolean;
  estado: string;
  createdAt?: string;
  updatedAt?: string;
};

export async function login(email: string, password: string): Promise<{ accessToken: string }> {
  const res = await fetch(`${getApiUrl()}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al iniciar sesión");
  return data;
}

export async function signup(body: {
  email: string;
  password: string;
  dni: string;
  nombre: string;
  apellido: string;
  grupo_sanguineo: string;
  factor_rh: string;
  fecha_nacimiento: string;
  sexo: string;
}): Promise<{ accessToken: string }> {
  const res = await fetch(`${getApiUrl()}/api/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error en el registro");
  return data;
}

export async function logout(): Promise<void> {
  await fetch(`${getApiUrl()}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function getMe(token: string): Promise<Donante> {
  const res = await fetch(`${getApiUrl()}/api/auth/getme`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener el perfil");
  return data;
}

export async function updateMe(
  token: string,
  body: Partial<{
    nombre: string;
    apellido: string;
    grupo_sanguineo: string;
    factor_rh: string;
    fecha_nacimiento: string;
    sexo: string;
  }>
): Promise<Donante> {
  const res = await fetch(`${getApiUrl()}/api/auth/me`, {
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

export async function changePassword(
  token: string,
  oldPassword: string,
  newPassword: string
): Promise<void> {
  const res = await fetch(`${getApiUrl()}/api/auth/changepassword`, {
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

export async function forgotPassword(email: string): Promise<void> {
  const res = await fetch(`${getApiUrl()}/api/auth/forgot-password`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al enviar el correo");
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  const res = await fetch(`${getApiUrl()}/api/auth/reset-password`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al restablecer la contraseña");
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
}

export function setStoredToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("authToken", token);
}

export function clearStoredToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authToken");
}
