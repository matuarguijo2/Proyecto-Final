# Instrucciones de despliegue en Vercel

## Configuración obligatoria: Root Directory

La app Next.js está en la carpeta **`frontend/`**. Vercel debe usar esa carpeta como raíz del proyecto.

**Tienes que configurarlo en el dashboard:**

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. **Settings** → **General**
3. En **Root Directory** haz clic en **Edit**
4. Escribe: **`frontend`** (solo esa palabra, sin barras)
5. **Save**
6. Vuelve a hacer **Redeploy**

Si no configuras esto, verás errores como:
- *"No Next.js version detected"*
- *"Couldn't find any 'pages' or 'app' directory"*

Con **Root Directory** = `frontend`, Vercel usará `frontend/package.json` (donde está `next`) y la carpeta `app/`.
