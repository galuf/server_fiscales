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
};

module.exports = {
  query,
};
