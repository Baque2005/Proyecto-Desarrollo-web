# Bolsa de empleo universitaria · Universidad de Guayaquil

Prototipo académico desarrollado con HTML, CSS, JavaScript, Bootstrap 5 y los iconos gratuitos Stroke Rounded de [Hugeicons](https://hugeicons.com/icons), publicados bajo licencia [MIT](https://github.com/hugeicons/hugeicons/blob/main/LICENSE.md). Bootstrap y la fuente de iconos se cargan desde sus CDN; los estilos propios están en `css/styles.css` y el comportamiento en `js/app.js`. Conecta estudiantes y graduados con empresas y oportunidades laborales. Usa el logo institucional de `assets/Logo/UGLOGO.png`, la ilustración del inicio en `assets/empleo-illustration.webp` y la foto del espacio para empresas en `assets/postulacion-empleo.jpg` (fuente: [Bitrix24](https://www.bitrix24.es/upload/optimizer/converted/upload/iblock/5f6/yu99u8gpyg8pt6srt24224c7lz3o5rfs.1024w.jpg.webp?1793268418801)). Los datos de demostración se guardan en `localStorage`; no hay servidor, base de datos ni autenticación real.

## Cómo abrirlo

1. Abre esta carpeta en Visual Studio Code.
2. Ejecuta `index.html` con la extensión Live Server, o sirve la carpeta con `python -m http.server 8000`.
3. En el segundo caso, abre `http://localhost:8000`.

El servidor local evita restricciones de almacenamiento que algunos navegadores aplican al abrir archivos directamente.

## Páginas

| Página | Contenido |
| --- | --- |
| `index.html` | Inicio, búsqueda, vacantes destacadas y categorías. |
| `pages/vacantes.html` | Búsqueda y filtros; crear, consultar, editar y eliminar ofertas; postulación y guardado. |
| `pages/postulaciones.html` | Historial, filtro por estado y retiro de postulaciones. |
| `pages/empresas.html` | Consulta, búsqueda, registro, edición y eliminación de perfiles empresariales. |
| `pages/perfil.html` | Formulario para crear y actualizar el perfil del estudiante o graduado. |
| `pages/admin.html` | Resumen, indicadores y gestión de categorías. |
| `pages/auth/registro.html` | Formulario de registro con selección de rol. |
| `pages/auth/login.html` | Inicio de sesión de demostración. |

La autenticación es simulada. Para probar los formularios de acceso puedes usar cualquier correo válido y una contraseña de seis o más caracteres. El proyecto no debe usarse con datos personales o credenciales reales.

## Demostración

Recorrido recomendado para el video de presentación:

1. Mostrar el inicio y la navegación entre secciones.
2. Buscar vacantes por palabra clave y aplicar filtros.
3. Publicar una vacante de demostración y editarla o eliminarla.
4. Postularse y consultar el estado en “Mis postulaciones”.
5. Registrar o actualizar una empresa y editar el perfil profesional.
6. Mostrar el panel de administración y crear o desactivar una categoría.

Para reiniciar los datos de demostración, elimina las claves `conectau.*` del almacenamiento local del navegador desde las herramientas de desarrollador.
