const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const MiembroCom = db.define(
  "miembros_comite_seleccion",
  //"empleados",
  {
    codigo_convocatoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    miembro_comite: {
      type: DataTypes.TEXT,
    },
    year_convocatoria: {
      type: DataTypes.INTEGER,
    },
  },
  {
    schema: "osce",
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  }
);
module.exports = MiembroCom;
