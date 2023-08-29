const Estoque = require("../models/estoqueModel");

module.exports = {
  async getEstoque(req, res) {
    try {
      const id = req.params.id;
      const estoque = await Estoque.findOne({
        where: {
          idProduto: id
        }
      });

      if (!estoque) {
        throw new Error("Estoque não encontrado!");
      }

      return res.status(200).json(estoque);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async patchEstoque(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
    
      if (data.constructor === Object && Object.keys(data).length === 0) {
        throw new Error("Sem dados para atualizar o estoque!");
      }
    
      const estoque = await Estoque.findOne({
        where: {
          idProduto: id
        }
      });
    
      if (!estoque) {
        throw new Error("Estoque não encontrado!");
      }
    
      await estoque.update(data);
    
      return res.status(200).json(estoque);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async deleteEstoque(req, res) {
    try {
      const id = req.params.id;
      const estoque = await Estoque.findOne({
        where: {
          idProduto: id
        }
      });

      if (!estoque) {
        throw new Error("Estoque não encontrado!");
      }

      return res.status(501).json({ message: "Não é possível deletar um estoque!" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};
