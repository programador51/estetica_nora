create procedure DeleteSchedule(IN id_param int)
BEGIN
    DELETE FROM Horario WHERE id = id_param;
end;
;