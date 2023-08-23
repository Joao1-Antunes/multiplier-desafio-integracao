const db = require("../database/database");

const Categoria = db.sequelize.define("categoria", {
  id: {
    type: db.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  codigo: {
    type: db.DataTypes.STRING,
  },
  titulo: {
    type: db.DataTypes.STRING,
  },
  status: {
    type: db.DataTypes.INTEGER,
  },
});

module.exports = Categoria;
