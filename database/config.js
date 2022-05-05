const { Sequelize } = require("sequelize");

// Heroku
// const db = new Sequelize(
//   "postgres://jvgzkrwbgrptku:8f9ac3718e466ea3ba2e206f7e42504587fe119247589969b7b848c2978972b9@ec2-3-223-213-207.compute-1.amazonaws.com:5432/d57984dbga9cb8",
//   {
//     logging: false,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   }
// );

// Local
const db = new Sequelize("usuarios", "postgres", "qwaser12", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = {
  db,
};
