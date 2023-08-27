const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");

// endpoints categoria
router.get("/categorias",categoriaController.getCategorias);
router.get("/categorias/:id", categoriaController.getCategoriaById);
router.post("/categorias", categoriaController.createCategoria);
router.patch("/categorias/:id", categoriaController.patchCategoria);
router.delete("/categorias/:id", categoriaController.deleteCategoria);

module.exports = router;
