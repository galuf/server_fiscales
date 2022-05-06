const ConvocatoriasQueries = {
  convocatoriaBasicByMemberNames: (names) => {
    return `
      select 
        *
      from 
        public.miembros_comite_seleccion mcs 
      where 
        miembro_comite = any('{${names.map((name) => `${name}`).join(',')}}')
      order by
        year_convocatoria 
      desc 
    `
  },
  convocatoriasByIds: (convocatoriaIds) => {
    return `
      select 
        *
      from 
        public.convocatorias_adjudicadas ca 
      where 
        codigo_convocatoria = any('{${convocatoriaIds.map((_id) => `${_id}`).join(',')}}')
    `
  }
}

module.exports = ConvocatoriasQueries