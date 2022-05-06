const { query } = require("../libs/query");
const { groupBy } = require("../libs/helper");
const { db } = require("../database/config");
const { executePagination } = require("../libs/helper");

const sobrecarga = async (req, res) => {
  const [results, metadata] = await db.query(query.sobrecarga);

  res.json({
    results,
  });
};

const sobrecargaPag = async (req, res) => {
  try {
    const page = req.query?.page ? Number(req.query.page) : 1;
    const limit = req.query?.limit ? Number(req.query.limit) : 10;
    const sortBy = req.query?.sortBy
      ? req.query.sortBy
      : "conteo_convocatorias";

    if (page <= 0) throw new Error("La página debe ser mayor a 0");
    if (limit <= 0) throw new Error("El limite debe ser mayor a 0");

    const { docs, info } = await executePagination(query.sobrecarga, {
      page,
      limit,
      sortBy,
    });

    res.json({
      success: true,
      data: {
        info,
        docs,
      },
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
  sobrecarga,
  sobrecargaPag,
};
