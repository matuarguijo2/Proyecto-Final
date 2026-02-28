# Cómo desplegar el backend para que el mapa muestre los centros

Para que los centros de donación aparezcan en el mapa en Vercel, el **backend** debe estar desplegado y accesible desde internet. El frontend en Vercel llama al backend para obtener los hospitales.

## Opción recomendada: Render (gratis)

### 1. Crear cuenta en Render

- Entrá a [render.com](https://render.com) y creá una cuenta (con GitHub).

### 2. Crear un Web Service

1. **Dashboard** → **New** → **Web Service**
2. Conectá tu repositorio de GitHub (el que contiene este proyecto).
3. Configuración:
   - **Name:** `gota-backend` (o el nombre que prefieras)
   - **Root Directory:** `backend` (importante: el backend está en esa carpeta)
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npx prisma migrate deploy && npx prisma db seed && npm start`

### 3. Variables de entorno en Render

En **Environment** → **Environment Variables** agregá:

| Variable | Valor |
|----------|-------|
| `DATABASE_URL` | Tu URL de Supabase (la misma que en `.env` local) |
| `PORT` | Render usa `PORT` automáticamente; no hace falta si no lo usás |
| `JWT_SECRET` | `mi_proyecto_final` (o el que uses) |
| `ACCESS_TOKEN_SECRET` | `test` |
| `REFRESH_TOKEN_SECRET` | `testtest` |
| `CORS_ORIGIN` | URL de tu frontend en Vercel, ej: `https://tu-proyecto.vercel.app` |

### 4. Obtener la URL del backend

Cuando termine el deploy, Render te dará una URL como:
`https://gota-backend.onrender.com`

### 5. Configurar Vercel

1. Entrá a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. **Settings** → **Environment Variables**
3. Agregá:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://gota-backend.onrender.com` (sin barra final)
4. **Save** y hacé un **Redeploy** del frontend

### 6. Verificar

- Entrá a la sección **Mapa** en tu app en Vercel.
- Deberían cargarse los centros de donación de Tucumán.
- Si no aparecen, revisá los logs en Render en **Logs** del servicio.

---

## Nota sobre la base de datos

Tu proyecto ya usa **Supabase** como base de datos (`DATABASE_URL` en `.env`). Asegurate de que:

1. Las migraciones de Prisma estén aplicadas en Supabase (el comando `npx prisma migrate deploy` en el deploy lo hace).
2. El seed se ejecute si la base está vacía (`npx prisma db seed` en el Start Command).

Si la base de datos no tiene centros, el seed creará los hospitales de Tucumán automáticamente.
