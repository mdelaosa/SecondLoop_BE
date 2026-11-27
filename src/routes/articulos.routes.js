import { Router } from 'express';

import { getAll, getById, getPropios, create, edit, updateEstado, remove, addFotos, removeFoto, getFavoritos, toggleFavorito } from '../controllers/articulos.controller.js';
import { authToken } from '../middlewares/auth.middleware.js';
import { checkId, checkPropietario, checkPropietarioAdminMod, validarArticulo, validarEstadoArticulo, validarFotos } from '../middlewares/articulos.middleware.js';

const router = Router();

router.get('/propios', authToken, getPropios);
router.get('/favoritos', authToken, getFavoritos);

router.get('/', getAll);
router.get('/:idArticulo', checkId, getById);

router.post('/', authToken, validarArticulo, create);
router.put('/:idArticulo', authToken, checkId, checkPropietario, validarArticulo, edit);
router.patch('/:idArticulo/estado', authToken, checkId, checkPropietarioAdminMod, validarEstadoArticulo, updateEstado);
router.delete('/:idArticulo', authToken, checkId, checkPropietarioAdminMod, remove);

router.post('/:idArticulo/favorito', authToken, checkId, toggleFavorito);

router.post('/:idArticulo/fotos', authToken, checkId, checkPropietario, validarFotos, addFotos);
router.delete('/:idArticulo/fotos/:idFoto', authToken, checkId, checkPropietario, removeFoto);

export default router;
