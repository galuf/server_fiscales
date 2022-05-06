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
}

module.exports = MiembrosQueries