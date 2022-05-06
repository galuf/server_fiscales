const { Sequelize } = require("sequelize");

// Heroku
const db = new Sequelize(
  process.env.POSTGRES_CONNECTION,
  {
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// Local
//const db = new Sequelize("usuarios", "postgres", "qwaser12", {
//  host: "localhost",
//  dialect: "postgres",
//  logging: false,
//});

module.exports = {
  db,
};
