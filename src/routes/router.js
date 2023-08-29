const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");
const produtoController = require("../controllers/produtoController");
const estoqueController = require("../controllers/estoqueController");

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

// endpoints estoque
router.get("/produtos/:id/estoque", estoqueController.getEstoque);
router.patch("/produtos/:id/estoque", estoqueController.patchEstoque);
router.delete("/produtos/:id/estoque", estoqueController.deleteEstoque);

module.exports = router;
