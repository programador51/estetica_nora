create procedure InsertIntoService(IN venta_param decimal(10, 2), IN costo_param decimal(10, 2),
                                   IN tolerancia_param int, IN duracion_param int, IN suceptible_cambios_param tinyint,
                                   IN descripcion_param long)

                                   BEGIN
INSERT INTO Servicios (venta, costo, toleranciaEnMinutos, duracionEnMinutos, estatus, suceptibleEnCambios, descripcion)
VALUES (venta_param, costo_param, tolerancia_param, duracion_param, 1, suceptible_cambios_param, descripcion_param);

    SELECT LAST_INSERT_ID() AS id;


END

;