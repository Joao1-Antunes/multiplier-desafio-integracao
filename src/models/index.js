module.exports = async (sequelize) => {
  // tabelas
  sequelize.categoria = require("../models/categoriaModel");
  sequelize.produto = require("../models/produtoModel");
  sequelize.estoque = require("../models/estoqueModel");

  // relacionamento 1:1
  sequelize.produto.belongsTo(sequelize.categoria, {
    foreignKey: "idCategoria",
    as: "categoria",
  });

  // relacionamento 1:1
  sequelize.estoque.belongsTo(sequelize.produto, {
    foreignKey: "idProduto",
    as: "produto",
  });

  // sincroniza com o banco de dados
  await sequelize.sync({ force: false });
};
