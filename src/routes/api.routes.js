import { Router } from 'express';

import { authToken } from '../middlewares/usuarios.middleware.js';

import usuariosRoutes from './usuarios.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

router.use('/usuarios', usuariosRoutes);
router.use('/auth', authRoutes);

export default router;