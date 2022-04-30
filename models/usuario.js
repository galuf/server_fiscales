const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Usuario = db.define('usuario',{
  nombre: {
    type: DataTypes.STRING,
  },
  facultad: {
    type: DataTypes.STRING,
  },
  titulo: {
    type: DataTypes.STRING,
  },
  universidad: {
    type: DataTypes.STRING,
  },
  region: {
    type: DataTypes.STRING,
  },
  apellidos: {
    type: DataTypes.STRING,
  },
  tipo: {
    type: DataTypes.STRING,
  },
  imagen: {
    type: DataTypes.STRING,
  },
  mostrar: {
    type: DataTypes.TINYINT,
  }

})

module.exports = Usuario;