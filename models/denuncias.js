const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Denuncias = db.define(
  "denuncias_personas",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_denunciado: {
      type: DataTypes.STRING,
    },
    email_denunciante: {
      type: DataTypes.STRING,
    },
    region: {
      type: DataTypes.STRING,
    },
    flag_entidad: {
      type: DataTypes.TINYINT,
    },
    nombre_entidad: {
      type: DataTypes.STRING,
    },
    flag_miembro_comite: {
      type: DataTypes.TINYINT,
    },
    prueba_url: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  }
);

module.exports = Denuncias;
