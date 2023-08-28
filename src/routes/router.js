const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");
const produtoController = require("../controllers/produtoController");

// endpoints categoria
router.get("/categorias",categoriaController.getCategorias);
router.get("/categorias/:id", categoriaController.getCategoriaById);
router.post("/categorias", categoriaController.createCategoria);
router.patch("/categorias/:id", categoriaController.patchCategoria);
router.delete("/categorias/:id", categoriaController.deleteCategoria);

// endpoints produtos
router.get("/produtos", produtoController.getProduto);
router.get("/produtos/:id", produtoController.getProdutoById);
router.post("/produtos", produtoController.createProduto);
router.patch("/produtos/:id", produtoController.patchProduto);
router.delete("/produtos/:id", produtoController.deleteProduto);

module.exports = router;
