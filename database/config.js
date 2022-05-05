const { Sequelize } = require("sequelize");

// const db = new Sequelize(
//   "d57984dbga9cb8",
//   "jvgzkrwbgrptku",
//   "8f9ac3718e466ea3ba2e206f7e42504587fe119247589969b7b848c2978972b9",
//   {
//     host: "ec2-3-223-213-207.compute-1.amazonaws.com",
//     dialect: "postgres",
//     logging: false,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   }
// );

const db = new Sequelize("usuarios", "postgres", "qwaser12", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = {
  db,
};
