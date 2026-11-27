import { Router } from 'express';

import { getAll, getById, create, edit, remove } from '../controllers/categorias.controller.js';
import { checkId, validarCategoria } from '../middlewares/categorias.middleware.js';
import { checkRol } from '../middlewares/usuarios.middleware.js';
import { authToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas públicas
router.get('/', getAll);
router.get('/:idCategoria', checkId, getById);

// Rutas privadas (Solo ADMINISTRADOR)
router.post('/', authToken, checkRol(['ADMINISTRADOR']), validarCategoria, create);
router.put('/:idCategoria', authToken, checkRol(['ADMINISTRADOR']), checkId, validarCategoria, edit);
router.delete('/:idCategoria', authToken, checkRol(['ADMINISTRADOR']), checkId, remove);

export default router;