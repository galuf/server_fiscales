const { query } = require("../libs/query");
const { groupBy, paginator } = require("../libs/helper");
const { db } = require("../database/config");

const miembrosAcusados = async (req, res) => {
  const {
    groupBy: g = "departamento",
    page = 1,
    limit = 10,
    sortBy = "total",
    order = "desc",
  } = req.query;

  const [results, metadata] = await db.query(query.miembrosComiteAcusadosLugar);
  const resultGroupByDepartment = groupBy(results, g);
  const resulPag = paginator(results, page, limit, "", "total", "desc");
  console.log(resulPag);
  res.json({
    results: Object.keys(resultGroupByDepartment).map((key) => {
      const array = resultGroupByDepartment[key];
      return {
        [g]: key,
        total: array.reduce((acc, element) => {
          return acc + Number(element.conteo_lugar);
        }, 0),
      };
    }),
  });
};

const allAcusados = async (req, res) => {
  const { groupBy: g, page, limit, sortBy } = req.query;
  let query = `select * from public.denuncias_personas`;

  const [results, metadata] = await db.query(query);
  //const conteoDep = results.reduce(a, suma, 0);
  const resultGroupByDepartment = groupBy(results, g);

  //const limit = parseInt(pageLimit, 10) || 10;

  //console.log(metadata);
  res.json({
    msg: "Ready",
  });
};

module.exports = {
  miembrosAcusados,
  allAcusados,
};
