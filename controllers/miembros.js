const { query } = require("../libs/query");
const ConvocatoriasQueries = require("../libs/queries/convocatorias");
const MiembrosQueries = require("../libs/queries/miembros");
const { db } = require("../database/config");
const { executePagination } = require("../libs/pagination");
const { groupBy } = require("../libs/helper");


const resolveMembers = async (members) => {
  const queryConvocatorias = ConvocatoriasQueries.convocatoriasByMemberNames(members.map((member) => member.fullname));

  const [ convocatoriaResults ] = await db.query(queryConvocatorias);

  const convocatoriaResultsGroupBy = groupBy(convocatoriaResults, 'miembro_comite')

  return members.map((member) => ({
    ...member,
    convocatorias: convocatoriaResultsGroupBy[member.fullname] ?? [],
    totalConvocatorias: convocatoriaResultsGroupBy[member.fullname]?.length ?? 0,
  }))
}

const getMemberBySearch = async (req, res) => {
  try {
    const page = req.query?.page ? Number(req.query.page) : 1;
    const limit = req.query?.limit ? Number(req.query.limit) : 15;
    const sortBy = req.query?.sortBy ? req.query.sortBy : "penal";
    const search = req.query?.search ? req.query.search : "";

    if(page <= 0) throw new Error("La página debe ser mayor a 0");
    if(limit <= 0) throw new Error("El limite debe ser mayor a 0");

    const { docs, info } = await executePagination(MiembrosQueries.getMemberBySearch({
      sortBy,
      search
    }), {
      page,
      limit,
      sortBy,
    })

    const _docs = await resolveMembers(docs)

    res.json({
      success: true,
      data: {
        info,
        docs: _docs
      }
    })
  } catch (error) {
    console.log("Hubo un error: ", error);
    res.status(500).json({
      succes: false,
      msg: "Hable con el administrador",
    });
  }
}

module.exports = {
  getMemberBySearch,
};