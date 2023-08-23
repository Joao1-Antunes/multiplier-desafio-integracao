const db = require("../database/database");

const Produto = db.sequelize.define("produto", {
  id: {
    type: db.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  codigo: {
    type: db.DataTypes.STRING,
  },
  nome: {
    type: db.DataTypes.STRING,
  },
  descricao: {
    type: db.DataTypes.TEXT,
  },
  valor: {
    type: db.DataTypes.DECIMAL,
  },
  status: {
    type: db.DataTypes.INTEGER,
  },
});

module.exports = Produto;
