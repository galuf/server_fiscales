const query = {
  miembrosComiteAcusadosLugar: `with presuntos_ubicacion as (
    select pr.*, ic.departamento, ic.provincia, ic.distrito  from public.presuntos_responsables pr 
    left join public.informes_control ic on pr.num_inform = ic.num_inform
  ), presuntos_ubicacion_unicos as (
    select fullname , departamento, provincia, distrito, count(*) conteo
    from presuntos_ubicacion
    group by fullname , departamento, provincia, distrito
  ), miembros_comite_unicos as (
    select * from (select distinct miembro_comite as nombre_miembro_comite from public.miembros_comite_seleccion) mcs
  ), 
  presuntos_miembros as (
    select puu.*, mcu.nombre_miembro_comite from presuntos_ubicacion_unicos puu 
    inner join miembros_comite_unicos mcu on puu.fullname = mcu.nombre_miembro_comite
  )
  select departamento, provincia, distrito, count(*) conteo_lugar
  from presuntos_miembros 
  group by departamento, provincia, distrito
  order by conteo_lugar desc`,
  all: `with presuntos_ubicacion as (
    select pr.*, ic.departamento, ic.provincia, ic.distrito  from public.presuntos_responsables pr 
    left join public.informes_control ic on pr.num_inform = ic.num_inform
  ), presuntos_ubicacion_unicos as (
    select fullname , departamento, provincia, distrito, count(*) conteo
    from presuntos_ubicacion
    group by fullname , departamento, provincia, distrito
  ) -- se borra miembros_comite_unicos y presuntos_miembros
  select departamento, provincia, distrito, count(*) conteo_lugar
  from presuntos_ubicacion_unicos 
  group by departamento, provincia, distrito
  order by conteo_lugar desc;`,
  sobrecarga: `with sobrecarga_comite_anual as (
    select 
    miembro_comite, year_convocatoria, count(*) conteo_convocatorias from public.miembros_comite_seleccion mcs 
    group by miembro_comite, year_convocatoria
  ), presuntos_anual_total as (
    select pr.fullname, pr.civil, pr.penal, pr.adm_ent, pr.adm_pas, pr.adm,
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
    anio_implicado, count(*) conteo_acusacion
    from presuntos_anual_total
    where anio_implicado >= 2018
    group by fullname,
    anio_implicado
  ), miembros_sobrecarga_infoacusacion as (
    select *
    from sobrecarga_comite_anual sca
    full outer join presuntos_unicos_anual pua on sca.miembro_comite = pua.fullname and sca.year_convocatoria = pua.anio_implicado
  ), clean_miembros_infoacusacion as (
    select 
    coalesce(miembro_comite, fullname) nombre_persona_evaluada,
    coalesce (year_convocatoria, anio_implicado) anio,
    coalesce (conteo_convocatorias, 0) conteo_convocatorias,
    coalesce (civil, 0) civil,
    coalesce (penal, 0) penal,
    coalesce (adm_ent, 0) adm_ent,
    coalesce (adm_pas, 0) adm_pas,
    coalesce (adm, 0) adm,
    coalesce (conteo_acusacion, 0) conteo_acusacion
    from miembros_sobrecarga_infoacusacion
  )
  select * from clean_miembros_infoacusacion cmi 
  order by conteo_convocatorias desc;`,
  entidadMiembrosAcusados: `with presuntos_entidad as (
    select pr.*, ic.entidad  from public.presuntos_responsables pr 
    left join public.informes_control ic on pr.num_inform = ic.num_inform
  ), presuntos_entidad_unicos as (
    select fullname , entidad, count(*) conteo
    from presuntos_entidad
    group by fullname , entidad
  ), miembros_comite_unicos as (
    select * from (select distinct miembro_comite as nombre_miembro_comite from public.miembros_comite_seleccion) mcs
  ), 
  presuntos_miembros as (
    select peu.*, mcu.nombre_miembro_comite from presuntos_entidad_unicos peu 
    inner join miembros_comite_unicos mcu on peu.fullname = mcu.nombre_miembro_comite
  )
  select entidad, count(*) conteo_entidad
  from presuntos_miembros 
  group by entidad
  order by conteo_entidad desc;
  `,
  allAcusadosEntidades: `with presuntos_entidad as (
    select pr.*, ic.entidad  from public.presuntos_responsables pr 
    left join public.informes_control ic on pr.num_inform = ic.num_inform
  ), presuntos_entidad_unicos as (
    select fullname , entidad, count(*) conteo
    from presuntos_entidad
    group by fullname , entidad
  )
  select entidad, count(*) conteo_entidad
  from presuntos_entidad_unicos
  group by entidad
  order by conteo_entidad desc;`,
  porcentajeAcusadosConvocatoria: `with sobrecarga_comite_anual as (
    select 
    miembro_comite, codigo_convocatoria , year_convocatoria  from public.miembros_comite_seleccion mcs 
    group by miembro_comite, codigo_convocatoria, year_convocatoria
  ), presuntos_anual_total as (
    select pr.fullname, pr.civil, pr.penal, pr.adm_ent, pr.adm_pas, pr.adm,
    extract(year from ic.fecha_emision) anio_implicado
    from public.presuntos_responsables pr 
    left join public.informes_control ic on pr.num_inform = ic.num_inform
  ), presuntos_unicos_anual as (
    select fullname, 
    anio_implicado, count(*) conteo_acusacion
    from presuntos_anual_total
    where anio_implicado >= 2018
    group by fullname,
    anio_implicado
  ), miembros_sobrecarga_infoacusacion as (
    select *
    from sobrecarga_comite_anual sca
    left join presuntos_unicos_anual pua on sca.miembro_comite = pua.fullname and sca.year_convocatoria = pua.anio_implicado
  ), clean_miembros_infoacusacion as (
    select 
    miembro_comite nombre_persona_evaluada,
    codigo_convocatoria,
    year_convocatoria anio,
    coalesce (conteo_acusacion, 0) conteo_acusacion
    from miembros_sobrecarga_infoacusacion
  ), agrupacion_convocatoria_anio as (
    select codigo_convocatoria, anio,
    sum(conteo_acusacion) total_acusados, count(nombre_persona_evaluada) conteo_miembros,
    cast(sum(conteo_acusacion) * 100 as decimal) / count(nombre_persona_evaluada) porcentaje_acusados_100
    from clean_miembros_infoacusacion
    group by codigo_convocatoria, anio
  )
  select * from agrupacion_convocatoria_anio cmi
  ;`,
};

module.exports = {
  query,
};
