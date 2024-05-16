create
    definer = uclxadpcaqdi0ofu@`%` procedure AddReservation(IN day_param date, IN time_param time, IN finish_param time,
                                                            IN total_param decimal(10, 2))
BEGIN
    SET @weekdayNumber = DAYOFWEEK(day_param) - 1;
    SET @weekdayName = CASE @weekdayNumber
                           WHEN 1 THEN 'lunes'
                           WHEN 2 THEN 'martes'
                           WHEN 3 THEN 'miercoles'
                           WHEN 4 THEN 'jueves'
                           WHEN 5 THEN 'viernes'
                           WHEN 6 THEN 'sabado'
                           ELSE 'domingo' END;

    SET @schedulesFound = 0;


    SELECT COUNT(*)
    INTO @schedulesFound
    FROM Horario
    WHERE dia = @weekdayName
      AND (time_param >= Horario.desde
        OR finish_param <= Horario.hasta);

#     Validate there's a schedule for that day
    IF @schedulesFound <= 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
                    'No se puede hacer la cita, la estetica no tiene un horario disponible para ese día y horas';
    END IF;

# ------------------------------------------------------------------------------------

    SET @startDateTime = CONCAT(day_param, ' ', time_param);
    SET @endDateTime = CONCAT(day_param, ' ', finish_param);

    SET @numberOfReservationsOverlap = 0;

    SELECT COUNT(*)
    INTO @numberOfReservationsOverlap
    FROM Reservaciones
    WHERE fechaReservacion >= @startDateTime
      AND hasta <= @endDateTime;


    IF @numberOfReservationsOverlap >= 1 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
                    'No se puede hacer la cita, ya esta ocupado el horario que se solicita';
    END IF;

    INSERT INTO Reservaciones (cuenta, total, fechaReservacion, hasta, estatus, administrador)
    VALUES (1, total_param, @startDateTime, @endDateTime, 'reservado', 2);
END;

