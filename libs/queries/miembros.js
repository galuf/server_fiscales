const MiembrosQueries = {
  getMemberBySearch: ({ sortBy, search }) => {
    return `select
      dni,
      ${sortBy},
      fullname,
      count(*) total_${sortBy}
    from
      public.presuntos_responsables
    where 
      ${sortBy} = true and 
      lower(fullname) ~ lower('${search}')
    group by
      dni,
      ${sortBy},
      fullname`;
  },
  getTotalConvocatoriaByMember:({search}) => {
    return `select fullname, sum(prcc.tiene_convocatoria) as total_convocatorias from (select prc.fullname, CASE WHEN prc.codigo_convocatoria IS NULL THEN 0 ELSE 1 end  as tiene_convocatoria from (
      select * from (select distinct pr.fullname 
              from presuntos_responsables pr 
              where lower(pr.fullname) ~ lower('${search}')) pru
              left join miembros_comite_seleccion mc 
              on mc.miembro_comite  = pru.fullname) prc) prcc 
              group by prcc.fullname
          `
  },
  getMemberByDni: ({ dni }) => {
    return `select
      dni,
      fullname
    from
      public.presuntos_responsables
    where 
      dni = '${dni}'
    group by
      dni,
      fullname`;
  },
}


module.exports = MiembrosQueries