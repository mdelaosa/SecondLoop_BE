import { Router } from "express";

import { create, edit, getAll, getById, remove } from "../controllers/categorias.controller.js";
import { checkId } from "../middlewares/categorias.middleware.js";
//import { checkAdmin, checkRole } from "../middlewares/usuarios.middleware.js";

const router = Router();

router.get('/', getAll);

router.get('/:idCategoria', checkId, getById);

//router.post('/', checkRole('admin'), create);
router.post('/', create);

//router.put('/:idCategoria', checkAdmin, checkId, edit);
router.put('/:idCategoria', checkId, edit);

//router.delete('/:idCategoria', checkRole('usuario'), checkId, remove);
router.delete('/:idCategoria', checkId, remove);

export default router;