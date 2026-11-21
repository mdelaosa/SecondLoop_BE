import { Router } from 'express';

import { perfil, actualizarPerfil, borrarPerfil, cambiarEstadoUsuario, cambiarRolUsuario, obtenerArticulosUsuario, } from '../controllers/usuarios.controller.js';
import { checkRol, checkUsuarioId } from '../middlewares/usuarios.middleware.js';
import { authToken } from '../middlewares/auth.middleware.js'

const router = Router();

router.get('/perfil', authToken, perfil);
router.put('/perfil', authToken, actualizarPerfil);
router.delete('/perfil',authToken,  borrarPerfil);
router.patch('/:id/estado', authToken, checkRol(['ADMINISTRADOR', 'MODERADOR']), checkUsuarioId, cambiarEstadoUsuario);
router.patch('/:id/rol', authToken, checkRol(['ADMINISTRADOR']), checkUsuarioId, cambiarRolUsuario);
router.get('/:id/articulos', checkUsuarioId, obtenerArticulosUsuario);


export default router;