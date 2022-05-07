const ConvocatoriasQueries = require("../libs/queries/convocatorias");
const MiembrosQueries = require("../libs/queries/miembros");
const { db } = require("../database/config");
const { executePagination } = require("../libs/pagination");
const { groupBy } = require("../libs/helper");
const { keyBy } = require("lodash");
const PresuntosQueries = require("../libs/queries/presuntos");

const irregulars = [ "civil", "penal", "adm_ent", "adm_pas", "adm"]

const resolveConvocatorias = async (convocatorias) => {
  const convocatoriaIds = convocatorias.map((convocatoria) => convocatoria.codigo_convocatoria);

  const queryConvocatorias = ConvocatoriasQueries.convocatoriasByIds(convocatoriaIds);

  const [ convocatoriaResults ] = await db.query(queryConvocatorias);

  const convocatoriaBy = keyBy(convocatoriaResults, 'codigo_convocatoria')

  return convocatorias
    .map((convocatoria) => ({
      ...convocatoria,
      ...convocatoriaBy[convocatoria.codigo_convocatoria]
    }))
}

const resolveMembers = async (members, options) => {
  const queryConvocatorias = ConvocatoriasQueries.convocatoriaBasicByMemberNames(members.map((member) => member.fullname));
  const queryPresuntos = PresuntosQueries.presuntosByNames(members.map((member) => member.fullname))

  const [[ convocatoriaResults ], [presuntosResults]] = await Promise.all([
    db.query(queryConvocatorias),
    db.query(queryPresuntos),
  ]);

  const presuntosGroupBy = groupBy(presuntosResults, 'fullname');
  
  const convocatoriasFull = await resolveConvocatorias(convocatoriaResults)

  const convocatoriaResultsGroupBy = groupBy(convocatoriasFull, 'miembro_comite')
  
  return members.map((member) => {
    const presuntos = presuntosGroupBy[member.fullname] ?? []

    return ({
      ...member,
      convocatorias: options?.full ? (convocatoriaResultsGroupBy[member.fullname] ?? []) : (convocatoriaResultsGroupBy[member.fullname] ?? []).slice(0, 12),
      totalConvocatorias: convocatoriaResultsGroupBy[member.fullname]?.length ?? 0,
      presuntos: presuntosGroupBy[member.fullname] ?? [],
      irregulars: irregulars.reduce((acc, irregularKey) => {
        return ({
          ...acc,
          [irregularKey]: presuntos.filter((presunto) => presunto[irregularKey]).length
        })
      }, 0)
    })
  })
}

const getMemberBySearch = async (req, res) => {
  try {
    const page = req.query?.page ? Number(req.query.page) : 1;
    const limit = req.query?.limit ? Number(req.query.limit) : 15;
    const sortBy = req.query?.sortBy ? req.query.sortBy : "penal";
    const search = req.query?.search ? req.query.search : "";

    if(page <= 0) throw new Error("La página debe ser mayor a 0");
    if(limit <= 0) throw new Error("El limite debe ser mayor a 0");

    const queryFunc = sortBy === 'convocatorias' ? MiembrosQueries.getTotalConvocatoriaByMember : MiembrosQueries.getMemberBySearch

    const { docs, info } = await executePagination(queryFunc({
      sortBy,
      search
    }), {
      page,
      limit,
      sortBy,
    })

    const _docs = await resolveMembers(docs.map((doc) => ({
      ...doc,
      [`total_${sortBy}`]: Number(doc[`total_${sortBy}`]),
    })))

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

const getMembersOrderedByNumCom = async (req, res) => {
  try {
  const page = req.query?.page ? Number(req.query.page) : 1;
  const limit = req.query?.limit ? Number(req.query.limit) : 15;
  const search = req.query?.search ? req.query.search : "";

  if(page <= 0) throw new Error("La página debe ser mayor a 0");
  if(limit <= 0) throw new Error("El limite debe ser mayor a 0");
  
  const { docs, info } = await executePagination(MiembrosQueries.getTotalConvocatoriaByMember({
    search
  }), {
    page,
    limit,
    sortBy: 'convocatorias',
  })

  const _docs = await resolveMembers(docs.map((doc) => ({
    ...doc,
    ['total_convocatorias']: Number(doc['total_convocatorias']),
  })))

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
      success: false,
      msg: "Error al traer miembros",
    });
  }
}

const getMemberByDni = async (req, res) => {
  try {
    if(!req.params?.dni) throw new Error("El dni es requerido");

    const dni = req.params.dni

    const [results] = await db.query(MiembrosQueries.getMemberByDni({
      dni
    }))

    const docs = await resolveMembers(results, {
      full: true
    })

    res.json({
      success: true,
      data: docs[0]
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
  getMembersOrderedByNumCom,
  getMemberByDni
};