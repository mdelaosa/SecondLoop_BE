import { Router } from 'express';

import { obtenerValoracionesUsuario, publicarValoracionUsuario, borrarValoracionPorId} from '../controllers/valoraciones.controller.js';
import { authToken } from '../middlewares/auth.middleware.js';
import { checkUsuarioId, checkRol } from '../middlewares/usuarios.middleware.js';
import { checkValoracionId } from '../middlewares/valoraciones.middleware.js';

const router = Router()

router.get('/usuarios/:id', checkUsuarioId, obtenerValoracionesUsuario);
router.post('/usuarios/:id', authToken, checkUsuarioId, publicarValoracionUsuario);
router.delete('/:id', authToken, checkRol(['ADMINISTRADOR', 'MODERADOR']), checkValoracionId, borrarValoracionPorId)

export default router