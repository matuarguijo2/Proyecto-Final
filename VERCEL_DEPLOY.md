# Instrucciones de despliegue en Vercel

## Problema resuelto

El error "Couldn't find any 'pages' or 'app' directory" ocurre porque la aplicación Next.js está dentro de la carpeta `frontend/`, pero Vercel por defecto busca en la raíz del repositorio.

## Solución aplicada

Se creó un archivo `vercel.json` en la raíz que indica a Vercel que ejecute la instalación y el build desde la carpeta `frontend/`.

## Si el deploy sigue fallando

Configura manualmente el **Root Directory** en Vercel:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Entra en **Settings** → **General**
3. En la sección **Root Directory**, haz clic en **Edit**
4. Escribe: `frontend`
5. Guarda los cambios
6. Vuelve a hacer deploy

Con esto, Vercel usará `frontend/` como directorio raíz del proyecto y encontrará correctamente la carpeta `app/`.
