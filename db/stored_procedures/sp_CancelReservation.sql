create
    definer = uclxadpcaqdi0ofu@`%` procedure CancelReservation(IN id_param int)
BEGIN

    SET @currentStatus = 'reservado';

    SELECT estatus INTO @currentStatus FROM Reservaciones WHERE id = id_param;

    IF @currentStatus = 'terminado' THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
                    'No se puede cancelar la cita porque ya esta dado de alta como terminado, solo puedes cancelar las reservadas en curso';
    END IF;

    IF @currentStatus = 'cancelado' THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
                    'La reservación ya esta cancelada';
    END IF;


    UPDATE Reservaciones SET estatus = 'cancelado' WHERE id = id_param;
end;

