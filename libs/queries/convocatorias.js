const ConvocatoriasQueries = {
  convocatoriasByMemberNames: (names) => {
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
  }
}

module.exports = ConvocatoriasQueries