const Categoria = require("../models/categoriaModel");

module.exports = {
  async getCategorias(req, res) {
    try {
      const categoria = await Categoria.findAll();

      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getCategoriaById(req, res) {
    try {
      const id = req.params.id;
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        throw new Error("Categoria não encontrada!");
      }

      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async createCategoria(req, res) {
    try {
      const { codigo, titulo, status } = req.body;
      const categoria = await Categoria.create({ 
        codigo: codigo, 
        titulo: titulo, 
        status: status 
      });

      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async patchCategoria(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;

      if (data.constructor === Object && Object.keys(data).length === 0) {
        throw new Error("Sem dados para atualizar a categoria!");
      }

      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        throw new Error("Categoria não encontrada!");
      }

      await categoria.update(data);

      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async deleteCategoria(req, res) {
    try {
      const id = req.params.id;
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        throw new Error("Categoria não encontrada!");
      }

      await categoria.destroy();

      return res.status(200).json({ message: "Categoria deletada com sucesso!" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
