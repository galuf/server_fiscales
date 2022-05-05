const { query } = require("../libs/query");
const { groupBy, paginator } = require("../libs/helper");
const { db } = require("../database/config");

const miembrosAcusados = async (req, res) => {
  const { groupBy: g = "departamento", order = "desc" } = req.query;

  try {
    const [results, metadata] = await db.query(
      query.miembrosComiteAcusadosLugar
    );
    const resultGroupByDepartment = groupBy(results, g);

    const grouped = Object.keys(resultGroupByDepartment).map((key) => {
      const array = resultGroupByDepartment[key];
      return {
        [g]: key,
        total: array.reduce((acc, element) => {
          return acc + Number(element.conteo_lugar);
        }, 0),
      };
    });

    if (order == "desc") {
      grouped.sort((a, b) => b.total - a.total);
    } else {
      grouped.sort((a, b) => a.total - b.total);
    }

    res.json({
      succes: true,
      total: grouped.length,
      results: grouped,
    });
  } catch (error) {
    console.log("Hubo un error: ", error);
    res.status(500).json({
      succes: false,
      msg: "Hable con el administrador",
    });
  }
};

const allAcusados = async (req, res) => {
  const { groupBy: g = "departamento", order = "desc" } = req.query;

  try {
    const [results, metadata] = await db.query(query.all);
    const resultGroupByDepartment = groupBy(results, g);

    const grouped = Object.keys(resultGroupByDepartment).map((key) => {
      const array = resultGroupByDepartment[key];
      return {
        [g]: key,
        total: array.reduce((acc, element) => {
          return acc + Number(element.conteo_lugar);
        }, 0),
      };
    });

    if (order == "desc") {
      grouped.sort((a, b) => b.total - a.total);
    } else {
      grouped.sort((a, b) => a.total - b.total);
    }

    res.json({
      succes: true,
      total: grouped.length,
      results: grouped,
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
  miembrosAcusados,
  allAcusados,
};
