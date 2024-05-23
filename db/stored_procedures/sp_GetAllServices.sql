create
    definer = uclxadpcaqdi0ofu@`%` procedure GetAllServices()
BEGIN
    SELECT titulo                            AS name,
           id                                AS id,
           CAST(costo AS DECIMAL(10, 2)) + 0 AS costPrice,
           CAST(venta AS DECIMAL(10, 2)) + 0 AS sellPrice,
           duracionEnMinutos                 AS durationOnMinutes,
           toleranciaEnMinutos               AS toleranceOnMinutes,
           suceptibleEnCambios               AS susceptibleToChange,
           IFNULL(
                   (SELECT JSON_ARRAYAGG(urlFoto)
                    FROM Galeria
                    WHERE Galeria.idEntidad = Servicios.id
                      AND Galeria.tipo = 'servicios'
                      AND Galeria.estatus = 1),
                   JSON_ARRAY()
           )                                 AS imagen

    FROM Servicios
    WHERE estatus = 1;
end;

