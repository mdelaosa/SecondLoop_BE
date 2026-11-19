import { Router } from 'express';

import { registro, login, perfil, actualizarPerfil, borrarPerfil } from '../controllers/usuarios.controller.js';
import { authToken } from '../middlewares/usuarios.middleware.js';

const router = Router();

router.get('/perfil', authToken, perfil);
router.put('/perfil', authToken, actualizarPerfil);
router.delete('/perfil', authToken, borrarPerfil);

router.post('/registro', registro);
router.post('/login', login);


export default router;