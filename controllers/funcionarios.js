const { query } = require("../libs/query");
const { groupBy } = require("../libs/helper");
const { db } = require("../database/config");

const sobrecarga = async (req, res) => {
  const [results, metadata] = await db.query(query.sobrecarga);

  res.json({
    results,
  });
};

module.exports = {
  sobrecarga,
};
