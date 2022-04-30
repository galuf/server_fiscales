const { Sequelize } = require("sequelize");

const db = new Sequelize("usuarios", "postgres", "qwaser12", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = {
  db,
};
