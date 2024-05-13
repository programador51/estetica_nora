create
    definer = uclxadpcaqdi0ofu@`%` procedure AddSchedule(IN dia_param varchar(256), IN desde_param int, IN hasta_param int)
BEGIN

    INSERT INTO Horario(dia, desde, hasta)
    VALUES (dia_param, SEC_TO_TIME(desde_param), SEC_TO_TIME(hasta_param));

end;

