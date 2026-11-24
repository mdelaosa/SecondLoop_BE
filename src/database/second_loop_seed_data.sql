USE second_loop_db;

-- =====================================================
-- CATEGORIAS
-- =====================================================

INSERT INTO categorias (nombre) VALUES
('Camisetas'),
('Pantalones'),
('Zapatos'),
('Chaquetas'),
('Sudaderas'),
('Accesorios'),
('Vestidos'),
('Deporte'),
('Formal'),
('Vintage');

-- =====================================================
-- USUARIOS
-- =====================================================

INSERT INTO usuarios
(nombre, apellidos, username, email, password, rol, foto, localizacion, codigo_postal)
VALUES
('Laura','Sanchez','lauras','admin@secondloop.com','123456','ADMINISTRADOR','laura.jpg','Madrid','28001'),
('Carlos','Ruiz','carlosr','moderador@secondloop.com','123456','MODERADOR','carlos.jpg','Valencia','46001'),
('Juan','Perez','juanp','juan@email.com','123456','USUARIO','juan.jpg','Barcelona','08001'),
('Ana','Martin','anam','ana@email.com','123456','USUARIO','ana.jpg','Sevilla','41001'),
('Pedro','Garcia','pedrog','pedro@email.com','123456','USUARIO','pedro.jpg','Bilbao','48001'),
('Admin','Garcia','adming','admin@email.com','$2b$10$pmyfIPJVy02yBym02lrvEeFKKG/jRCAyplacsOFIsfYwCRHo8hsCm','ADMINISTRADOR','admin.jpg','Madrid','28001');

-- =====================================================
-- ARTICULOS (20)
-- =====================================================

INSERT INTO articulos
(titulo, descripcion, precio, talla, genero, marca,
estado_conservacion, estado, categoria_id, vendedor_id, comprador_id)
VALUES

('Camiseta Nike Negra','Camiseta deportiva talla M',20.00,'M','UNISEX','Nike','COMO_NUEVO','PUBLICADO',1,1,NULL),
('Jeans Levis 501','Vaquero clasico azul',35.00,'L','H','Levis','BUEN_ESTADO','PUBLICADO',2,2,NULL),
('Adidas Running','Zapatillas deportivas blancas',50.00,'UNICA','UNISEX','Adidas','NUEVO','PUBLICADO',3,3,NULL),
('Chaqueta Zara','Ideal para invierno',40.00,'M','M','Zara','COMO_NUEVO','PUBLICADO',4,4,NULL),
('Sudadera Puma','Color gris oscuro',25.00,'L','UNISEX','Puma','BUEN_ESTADO','PUBLICADO',5,5,NULL),

('Camiseta Vans','Color vino talla M',18.00,'M','UNISEX','Vans','BUEN_ESTADO','PUBLICADO',1,1,NULL),
('Pantalon Pull&Bear','Slim fit negro',22.00,'M','H','Pull&Bear','COMO_NUEVO','PUBLICADO',2,2,NULL),
('Converse Chuck Taylor','Clasicos negros',38.00,'UNICA','UNISEX','Converse','BUEN_ESTADO','PUBLICADO',3,3,NULL),
('Chaqueta Denim','Mezclilla azul vintage',30.00,'L','UNISEX','Levis','ACEPTABLE','PUBLICADO',4,4,NULL),
('Sudadera Champion','Oversize azul',28.00,'XL','UNISEX','Champion','COMO_NUEVO','PUBLICADO',5,5,NULL),

('Camiseta Adidas','Training mujer',19.00,'S','M','Adidas','NUEVO','PUBLICADO',1,1,NULL),
('Jeans Bershka','Skinny fit',16.00,'S','M','Bershka','BUEN_ESTADO','PUBLICADO',2,2,NULL),
('Nike Air Max','Seminuevos',70.00,'UNICA','UNISEX','Nike','COMO_NUEVO','PUBLICADO',3,3,NULL),
('North Face Rain','Impermeable negra',85.00,'XL','UNISEX','North Face','BUEN_ESTADO','PUBLICADO',4,4,NULL),
('Sudadera Reebok','Azul marino',20.00,'M','UNISEX','Reebok','ACEPTABLE','PUBLICADO',5,5,NULL),

('Polo Lacoste','Original verde',45.00,'M','H','Lacoste','COMO_NUEVO','PUBLICADO',9,1,NULL),
('Vestido Mango','Rojo elegante',30.00,'S','M','Mango','BUEN_ESTADO','PUBLICADO',7,2,NULL),
('Botines Zara','Cuero negro',42.00,'UNICA','M','Zara','COMO_NUEVO','PUBLICADO',3,3,NULL),
('Traje Hugo Boss','Traje formal negro',90.00,'XL','H','Hugo Boss','ACEPTABLE','PUBLICADO',9,4,NULL),
('Chaqueta Vintage 90s','Coleccion retro',25.00,'L','UNISEX','Vintage','BUEN_ESTADO','PUBLICADO',10,5,NULL);

INSERT INTO conversaciones (articulo_id, comprador_id, vendedor_id) VALUES
(1,2,1),
(2,3,2),
(3,4,3),
(4,5,4),
(5,1,5),
(6,3,1),
(7,4,2),
(8,5,3),
(9,1,4),
(10,2,5),
(11,4,1),
(12,5,2),
(13,1,3),
(14,2,4),
(15,3,5),
(16,5,1),
(17,1,2),
(18,2,3),
(19,3,4),
(20,4,5);

INSERT INTO favoritos (usuario_id, articulo_id) VALUES
(1,2),
(1,7),
(1,12),
(1,18),

(2,1),
(2,8),
(2,15),
(2,20),

(3,4),
(3,9),
(3,16),
(3,19),

(4,3),
(4,10),
(4,13),
(4,17),

(5,5),
(5,6),
(5,11),
(5,14);

INSERT INTO fotos (imagen, articulo_id) VALUES
('articulo1.jpg',1),
('articulo2.jpg',2),
('articulo3.jpg',3),
('articulo4.jpg',4),
('articulo5.jpg',5),
('articulo6.jpg',6),
('articulo7.jpg',7),
('articulo8.jpg',8),
('articulo9.jpg',9),
('articulo10.jpg',10),
('articulo11.jpg',11),
('articulo12.jpg',12),
('articulo13.jpg',13),
('articulo14.jpg',14),
('articulo15.jpg',15),
('articulo16.jpg',16),
('articulo17.jpg',17),
('articulo18.jpg',18),
('articulo19.jpg',19),
('articulo20.jpg',20);

INSERT INTO mensajes (mensaje, conversacion_id, emisor_id) VALUES

('Hola, sigue disponible?',1,2),
('Si, aun esta disponible',1,1),

('Me interesa el articulo',2,3),
('Perfecto, sigue en venta',2,2),

('Lo puedes enviar?',3,4),
('Claro que si',3,3),

('Aceptas cambios?',4,5),
('Depende de la oferta',4,4),

('Todavia lo tienes?',5,1),
('Si, disponible',5,5),

('Precio negociable?',6,3),
('Un poco solamente',6,1),

('Lo entregas hoy?',7,4),
('Podria ser mañana',7,2),

('Me gusta bastante',8,5),
('Gracias por tu interes',8,3),

('Incluye accesorios?',9,1),
('Solo lo que aparece en fotos',9,4),

('Puedes rebajarlo?',10,2),
('Te puedo bajar 5 euros',10,5),

('Reservamelo',11,4),
('Vale, reservado',11,1),

('Que talla es?',12,5),
('Talla S',12,2),

('Tiene defectos?',13,1),
('Ninguno relevante',13,3),

('Sigue anunciado?',14,2),
('Si',14,4),

('Envias fuera de ciudad?',15,3),
('Sin problema',15,5),

('Cuando podriamos quedar?',16,5),
('El fin de semana',16,1),

('Aceptas transferencia?',17,1),
('Si acepto',17,2),

('Puedes mandar mas fotos?',18,2),
('Te las envio luego',18,3),

('Me interesa comprarlo',19,3),
('Perfecto',19,4),

('Sigue a la venta?',20,4),
('Si continua publicado',20,5);

INSERT INTO reportes
(motivo, detalle, usuario_reportado_id, emisor_id, articulo_id)
VALUES
('Spam','Publicaciones repetidas',1,2,1),
('Contenido ofensivo','Descripcion inapropiada',2,3,2),
('Articulo falso','No coincide con fotos',3,4,3),
('Fraude','Posible estafa',4,5,4),
('Spam','Duplicado',5,1,5),

('Lenguaje ofensivo','Insultos',1,3,6),
('Venta engañosa','Datos incorrectos',2,4,7),
('Articulo prohibido','Revisar',3,5,8),
('Fraude','Actividad sospechosa',4,1,9),
('Spam','Demasiados anuncios',5,2,10),

('Incumplimiento','No responde',1,4,11),
('Descripcion falsa','Condicion incorrecta',2,5,12),
('Engaño','Marca incorrecta',3,1,13),
('Spam','Contenido repetido',4,2,14),
('Fraude','Sospechoso',5,3,15),

('Contenido ofensivo','Texto inapropiado',1,5,16),
('Articulo ilegal','Revisar publicacion',2,1,17),
('Incumplimiento','Posible abuso',3,2,18),
('Descripcion falsa','No coincide',4,3,19),
('Spam','Demasiados anuncios',5,4,20);

INSERT INTO moderaciones
(accion, detalle, reporte_id, moderador_id)
VALUES
('Advertencia','Primer aviso',1,2),
('Revision','Caso abierto',2,2),
('Eliminacion','Articulo eliminado',3,2),
('Revision','Pendiente',4,2),
('Advertencia','Incumplimiento',5,2),

('Bloqueo temporal','3 dias',6,2),
('Revision','Analizando',7,2),
('Advertencia','Normas',8,2),
('Eliminacion','Incumplimiento grave',9,2),
('Revision','Pendiente',10,2),

('Advertencia','Primer aviso',11,2),
('Revision','Caso abierto',12,2),
('Eliminacion','Retirado',13,2),
('Revision','Analisis',14,2),
('Advertencia','Normativa',15,2),

('Bloqueo temporal','7 dias',16,2),
('Revision','Abierto',17,2),
('Advertencia','Comportamiento',18,2),
('Eliminacion','Retirado',19,2),
('Cierre','Caso resuelto',20,2);

INSERT INTO notificaciones
(titulo,mensaje,usuario_id)
VALUES
('Bienvenido','Gracias por registrarte',1),
('Bienvenido','Gracias por registrarte',2),
('Bienvenido','Gracias por registrarte',3),
('Bienvenido','Gracias por registrarte',4),
('Bienvenido','Gracias por registrarte',5),

('Nuevo favorito','Han guardado tu articulo',1),
('Nuevo favorito','Han guardado tu articulo',2),
('Nuevo favorito','Han guardado tu articulo',3),
('Nuevo favorito','Han guardado tu articulo',4),
('Nuevo favorito','Han guardado tu articulo',5),

('Nuevo mensaje','Has recibido un mensaje',1),
('Nuevo mensaje','Has recibido un mensaje',2),
('Nuevo mensaje','Has recibido un mensaje',3),
('Nuevo mensaje','Has recibido un mensaje',4),
('Nuevo mensaje','Has recibido un mensaje',5),

('Oferta recibida','Revisa tu articulo',1),
('Oferta recibida','Revisa tu articulo',2),
('Oferta recibida','Revisa tu articulo',3),
('Oferta recibida','Revisa tu articulo',4),
('Oferta recibida','Revisa tu articulo',5);

INSERT INTO valoraciones
(comentario,puntuacion,receptor_id,emisor_id)
VALUES
('Excelente vendedor',5.00,1,2),
('Muy amable',4.50,2,3),
('Todo correcto',4.80,3,4),
('Muy recomendable',5.00,4,5),
('Buena experiencia',4.70,5,1),

('Rapido y atento',4.90,1,3),
('Producto perfecto',5.00,2,4),
('Vendedor fiable',4.80,3,5),
('Gran experiencia',5.00,4,1),
('Todo perfecto',4.60,5,2),

('Muy buena compra',5.00,1,4),
('Repetiria',4.90,2,5),
('Excelente trato',4.80,3,1),
('Recomendado 100%',5.00,4,2),
('Muy satisfecho',4.75,5,3),

('Articulo impecable',5.00,1,5),
('Entrega rapida',4.95,2,1),
('Buen vendedor',4.60,3,2),
('Todo segun descrito',4.85,4,3),
('Compra perfecta',5.00,5,4);