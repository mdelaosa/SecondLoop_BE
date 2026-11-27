import { selectById } from "../models/articulos.model.js";
import { ROLES, TALLAS, GENEROS, ESTADO_CONSERVACION, ESTADO_ARTICULO } from "../constants/enums.js";

const TALLAS_VALIDAS = Object.values(TALLAS);
const GENEROS_VALIDOS = Object.values(GENEROS);
const ESTADOS_CONSERVACION_VALIDOS = Object.values(ESTADO_CONSERVACION);
const ESTADOS_ARTICULO_VALIDOS = Object.values(ESTADO_ARTICULO);

// Comprueba que el idArticulo sea válido, exista en la BD y lo adjunta a req.articulo

const checkId = async (req, res, next) => {
    const { idArticulo } = req.params;

    if (isNaN(Number(idArticulo))) {
        return res.status(400).json({
            message: 'El ID del artículo debe ser un número válido.'
        });
    }

    try {
        const articulo = await selectById(idArticulo);
        if (!articulo) {
            return res.status(404).json({
                message: 'No existe un artículo con ese ID.'
            });
        }

        req.articulo = articulo;
        next();
    } catch (error) {
        next(error);
    }
};

// Comprueba que el usuario autenticado sea exclusivamente el vendedor propietario

const checkPropietario = (req, res, next) => {
    if (req.articulo.vendedor_id !== req.usuario.id) {
        return res.status(403).json({
            message: 'Solo el vendedor propietario puede realizar esta acción.'
        });
    }
    next();
};

//Comprueba que el usuario sea el propietario o tenga rol MODERADOR / ADMINISTRADOR

const checkPropietarioAdminMod = (req, res, next) => {
    const esPropietario = req.articulo.vendedor_id === req.usuario.id;
    const esAdminMod = [ROLES.MODERADOR, ROLES.ADMINISTRADOR].includes(req.usuario.rol);

    if (!esPropietario && !esAdminMod) {
        return res.status(403).json({
            message: 'No tienes permisos para realizar esta acción.'
        });
    }
    next();
};

//Valida y limpia los campos del body al crear (POST) o editar (PUT) un artículo

const validarArticulo = (req, res, next) => {
    const {
        titulo,
        descripcion,
        precio,
        talla,
        genero,
        marca = null,
        estado_conservacion,
        estado = ESTADO_ARTICULO.BORRADOR,
        categoria_id
    } = req.body || {};

    if (!titulo || !descripcion || precio === undefined || !talla || !genero || !estado_conservacion || !categoria_id) {
        return res.status(400).json({
            message: 'Todos los campos obligatorios (titulo, descripcion, precio, talla, genero, estado_conservacion, categoria_id) son requeridos.'
        });
    }

    if (Number(precio) <= 0) {
        return res.status(400).json({ message: 'El precio debe ser mayor que 0.' });
    }

    if (!TALLAS_VALIDAS.includes(talla)) {
        return res.status(400).json({ message: `Talla inválida. Valores permitidos: ${TALLAS_VALIDAS.join(', ')}` });
    }

    if (!GENEROS_VALIDOS.includes(genero)) {
        return res.status(400).json({ message: `Género inválido. Valores permitidos: ${GENEROS_VALIDOS.join(', ')}` });
    }

    if (!ESTADOS_CONSERVACION_VALIDOS.includes(estado_conservacion)) {
        return res.status(400).json({ message: `Estado de conservación inválido. Valores permitidos: ${ESTADOS_CONSERVACION_VALIDOS.join(', ')}` });
    }

    if (!ESTADOS_ARTICULO_VALIDOS.includes(estado)) {
        return res.status(400).json({ message: `Estado inválido. Valores permitidos: ${ESTADOS_ARTICULO_VALIDOS.join(', ')}` });
    }

    // Normalizamos los datos en req.body para que el controlador los use directamente
    req.body.titulo = titulo.trim();
    req.body.descripcion = descripcion.trim();
    req.body.precio = Number(precio);
    req.body.marca = marca ? marca.trim() : null;
    req.body.estado = estado;
    req.body.categoria_id = Number(categoria_id);

    next();
};

/*
 * Valida el estado en la ruta PATCH /:idArticulo/estado según el rol/propiedad del usuario
 * Si es el Propietario solo puede cambiar el estado a BORRADOR, PUBLICADO o VENDIDO
 * Si es Administrador o Moderador puede cambiar a cualquier estado
 */
const validarEstadoArticulo = (req, res, next) => {
    const { estado, comprador_id = null } = req.body || {};

    if (!estado || !ESTADOS_ARTICULO_VALIDOS.includes(estado)) {
        return res.status(400).json({
            message: `Estado inválido. Valores permitidos: ${ESTADOS_ARTICULO_VALIDOS.join(', ')}`
        });
    }

    const esAdminMod = [ROLES.MODERADOR, ROLES.ADMINISTRADOR].includes(req.usuario.rol);
    const estadosPropietario = [
        ESTADO_ARTICULO.BORRADOR,
        ESTADO_ARTICULO.PUBLICADO,
        ESTADO_ARTICULO.VENDIDO
    ];

    // Si NO es Moderador ni Administrador, se restringe a los 3 estados permitidos para el dueño
    if (!esAdminMod && !estadosPropietario.includes(estado)) {
        return res.status(403).json({
            message: `Como propietario solo puedes cambiar el estado a: ${estadosPropietario.join(', ')}.`
        });
    }

    req.body.comprador_id = estado === ESTADO_ARTICULO.VENDIDO ? comprador_id : null;
    next();
};


// Valida que el campo imagenes sea un array con al menos una URL válida

const validarFotos = (req, res, next) => {
    const { imagenes } = req.body || {};

    if (!Array.isArray(imagenes)) {
        return res.status(400).json({
            message: 'El campo imagenes debe ser un array.'
        });
    }

    const listaUrls = imagenes.filter((url) => typeof url === 'string' && url.trim().length > 0);

    if (listaUrls.length === 0) {
        return res.status(400).json({
            message: 'Debes enviar al menos una URL válida dentro del array "imagenes".'
        });
    }

    req.listaUrls = listaUrls;
    next();
};

export { checkId, checkPropietario, checkPropietarioAdminMod, validarArticulo, validarEstadoArticulo, validarFotos };
