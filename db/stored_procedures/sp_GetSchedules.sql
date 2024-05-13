create
    definer = uclxadpcaqdi0ofu@`%` procedure GetSchedules()
BEGIN
    select id                 AS id,
           TIME_TO_SEC(desde) AS desde,
           TIME_TO_SEC(hasta) AS hasta,
           CASE
               WHEN dia = 'lunes' THEN 1
               WHEN dia = 'martes' THEN 2
               WHEN dia = 'miércoles' THEN 3
               WHEN dia = 'jueves' THEN 4
               WHEN dia = 'viernes' THEN 5
               WHEN dia = 'sabado' THEN 6
               WHEN dia = 'domingo' THEN 7
               ELSE NULL -- Handle other cases if needed
               END            AS dia
    from Horario;
end;

