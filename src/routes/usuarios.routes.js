import { Router } from 'express';

import { perfil, actualizarPerfil, borrarPerfil, cambiarEstadoUsuario, cambiarRolUsuario, obtenerArticulosUsuario, obtenerValoracionesUsuario, publicarValoracionUsuario } from '../controllers/usuarios.controller.js';
import { checkRol, checkUsuarioId, authToken } from '../middlewares/usuarios.middleware.js';

const router = Router();

router.get('/perfil', authToken, perfil);
router.put('/perfil', authToken, actualizarPerfil);
router.delete('/perfil',authToken,  borrarPerfil);
router.patch('/:id/estado', authToken, checkRol(['ADMINISTRADOR', 'MODERADOR']), checkUsuarioId, cambiarEstadoUsuario);
router.patch('/:id/rol', authToken, checkRol(['ADMINISTRADOR']), checkUsuarioId, cambiarRolUsuario);
router.get('/:id/articulos', checkUsuarioId, obtenerArticulosUsuario);
router.get('/:id/valoraciones', checkUsuarioId, obtenerValoracionesUsuario);
router.post('/:id/valoraciones', authToken, checkUsuarioId, publicarValoracionUsuario);


export default router;