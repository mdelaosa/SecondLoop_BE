import { Router } from "express";

import categoriasRoutes from './categorias.routes.js';
//import { authToken } from "../middlewares/usuarios.middleware.js";

const router = Router();

//router.use('/categorias', authToken, categoriasRoutes);
router.use('/categorias', categoriasRoutes);
//router.use('/articulos', authToken, articulosRoutes);
//router.use('/articulos', articulosRoutes);

export default router;