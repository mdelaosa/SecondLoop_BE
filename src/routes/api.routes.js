import { Router } from 'express';

import usuariosRoutes from './usuarios.routes.js';
import authRoutes from './auth.routes.js';
import valoracionesRoutes from './valoraciones.routes.js'
import categoriasRoutes from './categorias.routes.js';
import articulosRoutes from './articulos.routes.js';

const router = Router();

router.use('/usuarios', usuariosRoutes);
router.use('/auth', authRoutes);
router.use('/valoraciones', valoracionesRoutes)

router.use('/categorias', categoriasRoutes);
router.use('/articulos', articulosRoutes);

export default router;
