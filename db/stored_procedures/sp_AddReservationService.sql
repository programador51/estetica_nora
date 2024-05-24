create procedure AddReservationService(IN serviceId_param int, IN reservationId_param int,
                                       IN venta_param decimal(10, 2), IN costo_param decimal(10, 2))
begin
    INSERT INTO ServiciosReservacion (servicio, reservacion, venta, costo)
    VALUES (serviceId_param, serviceId_param, venta_param, costo_param);
end;
;