create procedure GetReservation(IN id_param int)
begin
    SELECT * FROM Reservaciones WHERE id = id_param;

    SELECT * FROM ServiciosReservacion WHERE reservacion = id_param;

end;
;