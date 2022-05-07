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
  getMemberBySearchComplete: ({ search }) => {
    return `
      with sobrecarga_comite_anual as (
        select 
        miembro_comite, count(*) conteo_convocatorias from public.miembros_comite_seleccion mcs 
        group by miembro_comite
      ), presuntos_anual_total as (
        select pr.fullname, pr.civil, pr.penal, pr.adm_ent, pr.adm_pas, pr.adm, pr.dni,
        extract(year from ic.fecha_emision) anio_implicado
        from public.presuntos_responsables pr 
        left join public.informes_control ic on pr.num_inform = ic.num_inform
      ), presuntos_unicos_anual as (
        select fullname, 
        sum(civil::int) as civil,
        sum(penal::int) as penal,
        sum(adm_ent::int) as adm_ent,
        sum(adm_pas::int) as adm_pas,
        sum(adm::int) as adm,
        count(*) conteo_acusacion,
        dni
        from presuntos_anual_total
        where anio_implicado >= 2018
        group by fullname, dni
      ), miembros_sobrecarga_infoacusacion as (
        select *
        from sobrecarga_comite_anual sca
        full outer join presuntos_unicos_anual pua on sca.miembro_comite = pua.fullname
      ), clean_miembros_infoacusacion as (
        select 
        coalesce(miembro_comite, fullname) fullname,
        coalesce (conteo_convocatorias, 0) conteo_convocatorias,
        coalesce (civil, 0) civil,
        coalesce (penal, 0) penal,
        coalesce (adm_ent, 0) adm_ent,
        coalesce (adm_pas, 0) adm_pas,
        coalesce (adm, 0) adm,
        coalesce (conteo_acusacion, 0) conteo_acusacion,
        coalesce (dni, '') dni
        from miembros_sobrecarga_infoacusacion
      )
        select * from clean_miembros_infoacusacion cmi
        where lower(fullname) ~ lower('${search}')
    `
  },
  getTotalConvocatoriaByMember:({search}) => {
    return `select fullname, sum(prcc.tiene_convocatoria) as convocatorias from (select prc.fullname, CASE WHEN prc.codigo_convocatoria IS NULL THEN 0 ELSE 1 end  as tiene_convocatoria from (
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