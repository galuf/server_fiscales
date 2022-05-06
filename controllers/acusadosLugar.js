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
  console.log(order)
  const [results, metadata] = await db.query(query.miembrosComiteAcusadosLugar);
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

  //console.log(grouped)

  const resulPag = paginator(grouped, page, limit, "", "total", order);
  //console.log(resulPag);
  res.json({
    ...resulPag
  });
};

const allAcusados = async (req, res) => {
  const { groupBy: g, page=1, limit=10, sortBy, order='desc' } = req.query;
  let query = `select * from public.denuncias_personas`;

  const [results, metadata] = await db.query(query);

  //const resultGroupByDepartment = groupBy(results, g);

  res.json({
    msg: "Ready",
    results
  });
};

module.exports = {
  miembrosAcusados,
  allAcusados,
};
