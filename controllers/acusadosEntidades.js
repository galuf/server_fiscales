const { query } = require("../libs/query");
const { groupBy } = require("../libs/helper");
const { db } = require("../database/config");

const miembrosAcusadosEntidades = async (req, res) => {
  try {
    const [results, metadata] = await db.query(query.entidadMiembrosAcusados);
    res.json({
      success: true,
      total: results.length,
      results: results,
    });
  } catch (error) {
    console.log("Hubo un error: ", error);
    res.status(500).json({
      success: false,
      msg: "Hable con el administrador",
    });
  }
};

const allAcusadosEntidades = async (req, res) => {
  try {
    const [results, metadata] = await db.query(query.allAcusadosEntidades);

    res.json({
      succes: true,
      total: results.length,
      results: results,
    });
  } catch (error) {
    console.log("Hubo un error: ", error);
    res.status(500).json({
      succes: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  miembrosAcusadosEntidades,
  allAcusadosEntidades,
};
