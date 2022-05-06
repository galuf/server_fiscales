const PresuntosQueries = {
  presuntosByNames: (names) => {
    return `
    select 
      pr.*, 
      ic.departamento, 
      ic.provincia, 
      ic.distrito,
      ic.fecha_emision 
    from 
      public.presuntos_responsables pr left join 
      public.informes_control ic 
    on pr.num_inform = ic.num_inform
    where
      fullname = any('{${names.map((name) => `${name}`).join(',')}}')
    order by
      ic.fecha_emision 
    desc
    `
  },
}

module.exports = PresuntosQueries