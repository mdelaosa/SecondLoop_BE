# API Second_Loop

## Recuperar todas las categorias

Method: GET
Url: /api/categorias
Headers: XXXX (PUBLICO)
Body: XXXXX

Response:
- Un array con todas las categorías

## Crear una nueva categoría

Method: POST
Url: /api/categorias
Headers: Authorization -> TOKEN  (ADMINISTRADOR)
Body: nombre

Response: 
- Objeto con los datos de la nueva categoría

## Actualiza los datos de una categoría

Method: PUT
Url: /api/categorias/IDCATEGORIA
Headers: Authorization -> TOKEN  (ADMINISTRADOR)
Body: nombre

Response:
- Objeto con los datos de la categoría actualizada

## Borrar una categoría

Method: DELETE
Url: /api/categorias/IDCATEGORIA
Headers: Authorization -> TOKEN  (ADMINISTRADOR)
Body: XXXXX

Response:
- Objeto con los datos de la categoría borrada

## Recuperar todos los artículos activos (estado = 'PUBLICADO')

Method: GET
Url: /api/articulos
Headers: XXXX   (PUBLICO)
Body: XXXXX

Response:
- Un array con todos los artículos publicados. Admite query params para filtrar: ?q=texto (índice FULLTEXT), ?categoria_id=, ?talla=, ?genero=, ?estado_conservacion=, ?precio=? y ?codigo_postal=?.

## Recuperar los detalles de un artículo (estado = 'PUBLICADO')

Method: GET
Url: /api/articulos/IDARTICULO
Headers: XXXX   (PUBLICO)
Body: XXXXX

Response:
- Un array con todos los detalles del artículo incluyendo sus fotos y datos del vendedor. Añade la condición AND a.estado = 'PUBLICADO' directamente en el WHERE de tu consulta de detalle público (y asegúrate de que el vendedor también esté activo con u.esta_activo = 1)

## Crear un nuevo artículo (en estado 'BORRADOR' o 'PUBLICADO')

Method: POST
Url: /api/articulos
Headers: Authorization -> TOKEN  (Cualquier rol (JWT))
Body: titulo, descripcion, precio, talla, genero, marca, localizacion, codigo_postal, estado_conservacion, estado, categoria_id, vendedor_id

Response: 
- Objeto con los datos del nuevo artículo

## Modifica los datos de un artículo (en estado 'BORRADOR' o 'PUBLICADO')

Method: PUT
Url: /api/articulos/IDARTICULO
Headers: Authorization -> TOKEN  (Propietario)
Body: titulo, descripcion, precio, talla, genero, marca, localizacion, codigo_postal, estado_conservacion, estado, categoria_id, vendedor_id

Response: 
- Objeto con los datos del artículo modificado

## Cambia los datos del estado de un artículo (y el comprador si fue vendido)

Method: PATCH
Url: /api/articulos/IDARTICULO/estado
Headers: Authorization -> TOKEN  (Propietario, MODERADOR o ADMINISTRADOR)
Body: estado, comprador_id

Response: 
- Objeto con los datos del artículo modificado

## Borrar un artículo y sus fotos se borran automáticamente

Method: DELETE
Url: /api/articulos/IDARTICULO
Headers: Authorization -> TOKEN  (Propietario, MODERADOR o ADMINISTRADOR)
Body: XXXXX

Response:
- Objeto con los datos del artículo borrado

## Crea una o varias fotos asociadas a un artículo

Method: POST
Url: /api/articulos/IDARTICULO/fotos
Headers: Authorization -> TOKEN  (Propietario)
Body: array de fotos (campo image)

Response: 
- Objeto con array con las fotos del artículo

## Elimina una foto concreta del artículo

Method: DELETE
Url: /api/articulos/IDARTICULO/fotos/IDFOTO
Headers: Authorization -> TOKEN  (Propietario)
Body: XXXXX

Response:
- Objeto con los datos del artículo borrado

## Lista todos los artículos guardados en favoritos por el usuario autenticado

Method: GET
Url: /api/favoritos
Headers: XXXX   (Cualquier rol (JWT))
Body: XXXXX

Response:
- Un array con todos los artículos favoritos.

## Añade o quita (toggle) el artículo de la tabla favoritos

Method: POST
Url: /api/articulos/IDARTICULO/favoritos
Headers: XXXX   (Cualquier rol (JWT))
Body: XXXXX

Response:
- Un array con todos los artículos favoritos.


