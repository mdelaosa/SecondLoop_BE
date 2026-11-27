# API Second_Loop — Categorías, Artículos, Fotos y Favoritos

---

## Categorías

### Recuperar todas las categorías
- **Method:** `GET`
- **URL:** `/api/categorias`
- **Headers:** No requiere *(Público)*
- **Body:** Ninguno
- **Response (`200 OK`):** Array de objetos con todas las categorías ordenadas alfabéticamente.

### Recuperar una categoría por ID
- **Method:** `GET`
- **URL:** `/api/categorias/:idCategoria`
- **Headers:** No requiere *(Público)*
- **Body:** Ninguno
- **Response (`200 OK`):** Objeto con los datos de la categoría solicitada.

### Crear una nueva categoría
- **Method:** `POST`
- **URL:** `/api/categorias`
- **Headers:** `Authorization: <TOKEN>` *(Rol: `ADMINISTRADOR`)*
- **Body (JSON):**
  ```json
  {
    "nombre": "Ropa Deportiva"
  }
  ```
- **Response (`201 Created`):** Objeto con los datos de la nueva categoría.

### Actualizar los datos de una categoría
- **Method:** `PUT`
- **URL:** `/api/categorias/:idCategoria`
- **Headers:** `Authorization: <TOKEN>` *(Rol: `ADMINISTRADOR`)*
- **Body (JSON):**
  ```json
  {
    "nombre": "Moda Deportiva"
  }
  ```
- **Response (`200 OK`):** Objeto con los datos de la categoría actualizada.

### Borrar una categoría
- **Method:** `DELETE`
- **URL:** `/api/categorias/:idCategoria`
- **Headers:** `Authorization: <TOKEN>` *(Rol: `ADMINISTRADOR`)*
- **Body:** Ninguno
- **Response (`200 OK`):** Mensaje de confirmación y objeto con los datos de la categoría eliminada. *(Devuelve `400 Bad Request` si tiene artículos asociados)*.

---

## Artículos

### Recuperar todos los artículos publicados (con filtros)
- **Method:** `GET`
- **URL:** `/api/articulos`
- **Headers:** No requiere *(Público)*
- **Query Params opcionales:** `?titulo=`, `?descripcion=`, `?precio=`, `?talla=`, `?genero=`, `?marca=`, `?estado_conservacion=`, `?codigo_postal=`, `?localizacion=`, `?categoria_id=`.
- **Body:** Ninguno
- **Response (`200 OK`):** Array de objetos con los artículos en estado `PUBLICADO` de vendedores activos.

### Recuperar los detalles de un artículo
- **Method:** `GET`
- **URL:** `/api/articulos/:idArticulo`
- **Headers:** No requiere *(Público)*
- **Body:** Ninguno
- **Response (`200 OK`):** Objeto con todos los detalles del artículo, los datos del vendedor y el array `fotos`.

### Recuperar todos los artículos propios (con filtro de estado opcional)
- **Method:** `GET`
- **URL:** `/api/articulos/propios`
- **Headers:** `Authorization: <TOKEN>` *(Cualquier rol autenticado; el `vendedor_id` se obtiene del token)*
- **Query Param opcional:** `?estado=`.
- **Body:** Ninguno
- **Response (`200 OK`):** Array de objetos con los artículos propios en cualquier estado o en el estado filtrado.

### Crear un nuevo artículo
- **Method:** `POST`
- **URL:** `/api/articulos`
- **Headers:** `Authorization: <TOKEN>` *(Cualquier rol autenticado; el `vendedor_id` se obtiene del token)*
- **Body (JSON):**
  ```json
  {
    "titulo": "Cazadora vaquera vintage",
    "descripcion": "Cazadora vaquera azul clásico, apenas usada.",
    "precio": 25.50,
    "talla": "M",
    "genero": "UNISEX",
    "estado_conservacion": "COMO_NUEVO",
    "categoria_id": 1,
    "imagenes": ["https://ejemplo.com"]
  }
  ```
  *(El campo `imagenes` es opcional en la creación).*
- **Response (`201 Created`):** Objeto con los datos del artículo creado y sus fotos.

### Modificar los datos de un artículo
- **Method:** `PUT`
- **URL:** `/api/articulos/:idArticulo`
- **Headers:** `Authorization: <TOKEN>` *(Solo el vendedor propietario)*
- **Body (JSON):** `titulo`, `descripcion`, `precio`, `talla`, `genero`, `estado_conservacion`, `categoria_id`.
- **Response (`200 OK`):** Objeto con los datos del artículo actualizado.

### Cambiar el estado de publicación de un artículo
- **Method:** `PATCH`
- **URL:** `/api/articulos/:idArticulo/estado`
- **Headers:** `Authorization: <TOKEN>` *(Propietario, Administrador o Moderador)*
- **Body (JSON):**
  ```json
  {
    "estado": "VENDIDO",
    "comprador_id": 3
  }
  ```
  *(Valores válidos para `estado_publicacion`: `BORRADOR`, `PUBLICADO`, `EN_REVISION`, `RETIRADO`, `VENDIDO`. El campo `comprador_id` solo aplica si el estado es `VENDIDO`).*
- **Response (`200 OK`):** Mensaje de confirmación y objeto con los datos del artículo actualizado.

### Borrar un artículo
- **Method:** `DELETE`
- **URL:** `/api/articulos/:idArticulo`
- **Headers:** `Authorization: <TOKEN>` *(Propietario; sus fotos se eliminan en cascada)*
- **Body:** Ninguno
- **Response (`200 OK`):** Mensaje de confirmación y objeto con los datos del artículo eliminado.

---

## Fotos de Artículos

### Añadir una o varias fotos a un artículo
- **Method:** `POST`
- **URL:** `/api/articulos/:idArticulo/fotos`
- **Headers:** `Authorization: <TOKEN>` *(Solo el vendedor propietario)*
- **Body (JSON):** Enviar una URL en `"imagen"` o un array de URLs en `"imagenes"`:
  ```json
  {
    "imagenes": [
      "https://ejemplo.com",
      "https://ejemplo.com"
    ]
  }
  ```
- **Response (`201 Created`):** Mensaje de confirmación y array actualizado con todas las fotos del artículo.

### Eliminar una foto concreta de un artículo
- **Method:** `DELETE`
- **URL:** `/api/articulos/:idArticulo/fotos/:idFoto`
- **Headers:** `Authorization: <TOKEN>` *(Solo el vendedor propietario)*
- **Body:** Ninguno
- **Response (`200 OK`):** Mensaje de confirmación y el `fotoId` eliminado.

---

## Favoritos

### Listar los artículos favoritos del usuario autenticado
- **Method:** `GET`
- **URL:** `/api/articulos/favoritos`
- **Headers:** `Authorization: <TOKEN>` *(Cualquier rol autenticado)*
- **Body:** Ninguno
- **Response (`200 OK`):** Array de objetos con los artículos guardados en favoritos por el usuario del token.

### Añadir o quitar un artículo de favoritos (Toggle)
- **Method:** `POST`
- **URL:** `/api/articulos/:idArticulo/favorito`
- **Headers:** `Authorization: <TOKEN>` *(Cualquier rol autenticado)*
- **Body:** Ninguno
- **Response (`200 OK`):**
  ```json
  {
    "message": "Artículo añadido a favoritos.",
    "articuloId": 1,
    "isFavorite": true
  }
  ```
