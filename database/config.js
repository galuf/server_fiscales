const { Sequelize } = require("sequelize");

// Heroku
const db = new Sequelize(
  "postgres://rytygopcfaquuh:e353c987e32aa069e92d9f6f02bb11042fabf8fbea2946524c625795f41bbb40@ec2-3-223-213-207.compute-1.amazonaws.com:5432/db6i2ulsptvsh6",
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
