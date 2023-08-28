const db = require("../database/database");

const Estoque = db.sequelize.define("estoque", {
  id: {
    type: db.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantidade: {
    type: db.DataTypes.INTEGER,
  },
  reserva: {
    type: db.DataTypes.STRING,
  },
  status: {
    type: db.DataTypes.INTEGER,
  },
});

module.exports = Estoque;
