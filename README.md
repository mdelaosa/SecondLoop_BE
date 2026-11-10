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

