# Second Loop - Backend API

API REST desarrollada con Node.js, Express y MySQL para el proyecto final del Máster en Full Stack Developer de la UNIR que consiste en el desarrollo de una plataforma de compra-venta de artículos de segunda mano. 

---

## 📋 Requisitos previos

Antes de empezar, asegúrate de tener instalado en tu equipo:
* **Node.js** (v22.9 o superior)
* **pnpm** 
* **MySQL Server** y **MySQL Workbench**

---

## 🚀 Instalación y configuración inicial

1. **Clona el repositorio y muévete a la rama de desarrollo (develop):**
   ```bash
   git clone https://github.com/mdelaosa/SecondLoop_BE.git second_loop_be
   cd second_loop_be
   git checkout develop
   ```

2. **Instala las dependencias del proyecto:**
   ```bash
   pnpm install
   ```

3. **Configura las variables de entorno:**
   * Duplica el archivo `.env.example` en la raíz del proyecto y renómbralo a **`.env`**.
   * Abre `.env` y rellena tu contraseña local de MySQL:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_contraseña_de_mysql
   DB_NAME=second_loop_db
   JWT_SECRET=una_clave_secreta_muy_segura_para_el_master
   ```
4. **Estructura de carpetas del proyecto:**

    second_loop_be/
    ├── node_modules/              <-- (Ignorado en Git) Librerías instaladas
    ├── src/
    │   ├── config/
    │   │   └── db.js              <-- Conexión a la base de datos MySQL (Pool de conexiones)
    │   ├── constants/
    │   │   └── enums.js           <-- Constantes y ENUMs en mayúsculas (Localizacion, Roles, Estados)
    │   ├── models/                <-- Consultas SQL (SELECT, INSERT, UPDATE, DELETE)
    │   │   └── *.model.js
    │   ├── controllers/           <-- Lógica de negocio, roles y respuestas HTTP
    │   │   └── *.controller.js
    │   ├── routes/                <-- Definición de URLs (endpoints de la API)
    │   │   ├── api.routes.js
    │   │   └── *.routes.js
    │   ├── middlewares/           <-- Seguridad JWT, validación de datos y control de roles
    │   │   └── *.middleware.js
    │   └── app.js                 <-- Configuración de Express donde se unen todas las rutas
    ├── .env                       <-- (Ignorado en Git) Contraseñas de MySQL y claves secretas
    ├── .env.example               <-- Archivo de ejemplo para el fichero de entorno
    ├── .gitignore                 <-- Archivo que oculta node_modules y .env a Git
    ├── index.js                   <-- Punto de entrada que arranca el servidor (app.listen)
    └── package.json               <-- Metadatos y lista de dependencias del proyecto

    Nota: Los archivos .gitkeep dentro de las carpetas se pueden borrar

5. **Crea la base de datos local (`second_loop_db`):**
   * Abre **MySQL Workbench** y conéctate a tu servidor local.
   * Ejecuta el script **`database/second_loop_schema.sql`** (`File > Run SQL Script...`) para crear automáticamente la base de datos y sus tablas.
   *(Nota: El archivo `database/second_loop_db.mwb` contiene el diagrama visual EER).*

---

## ▶️ Arrancar el servidor

* **Modo desarrollo** (reinicio automático al guardar cambios):
  ```bash
  pnpm dev
  ```
* **Modo producción:**
  ```bash
  pnpm start
  ```
El servidor escuchará por el puerto definido en la variable PORT del fichero de entorno y por defecto en `http://localhost:3000`.

---

## 🌿 Flujo de trabajo en Git (Equipo)

* **`main`**: Rama de producción limpia (intocable hasta la entrega final).
* **`develop`**: Rama principal de integración y pruebas del equipo.
* **Para añadir una tarea nueva:**
  1. Actualiza tu rama `develop` local (`git checkout develop` y `git pull origin develop`).
  2. Crea una rama nueva (`git checkout -b feature/nombre-de-tu-tarea`).
  3. Sube tus cambios y abre un **Pull Request apuntando siempre hacia `develop`**.

---

## 🙏 Créditos y Atribución

Este proyecto ha sido inicializado utilizando la plantilla base [express-init-template](https://github.com/mariogiron/express-init-template) desarrollada por el profesor **Mario Girón** (UNIR), bajo licencia MIT.

