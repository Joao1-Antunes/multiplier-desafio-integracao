const Produto = require("../models/produtoModel");
const Estoque = require("../models/estoqueModel");

module.exports = { 
  async getProduto(req, res) {
    try {
      const produto = await Produto.findAll();

      return res.status(200).json(produto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getProdutoById(req, res) {
    try {
      const id = req.params.id;
      const produto = await Produto.findByPk(id);
      if (!produto) {
        throw new Error("Produto não encontrado!");
      }

      return res.status(200).json(produto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async createProduto(req, res) {
    try {
      const { idCategoria, codigo, nome, descricao, valor, status } = req.body;
      
      const produto = await Produto.create({ 
        idCategoria: idCategoria, 
        codigo: codigo,
        nome: nome,
        descricao: descricao,
        valor: valor,
        status: status
      });

      await Estoque.create({
        idProduto: produto.id, 
        quantidade: 0,
        reserva: 0,
        status: 1,
      });

      return res.status(200).json(produto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async patchProduto(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;

      if (data.constructor === Object && Object.keys(data).length === 0) {
        throw new Error("Sem dados para atualizar o produto!");
      }

      const produto = await Produto.findByPk(id);
      if (!produto) {
        throw new Error("Produto não encontrado!");
      }

      await produto.update(data);

      return res.status(200).json(produto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async deleteProduto(req, res) {
    try {
      const id = req.params.id;
      const produto = await Produto.findByPk(id);
      if (!produto) {
        throw new Error("Produto não encontrado!");
      }

      await produto.destroy();

      return res.status(200).json({ message: "Produto deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};