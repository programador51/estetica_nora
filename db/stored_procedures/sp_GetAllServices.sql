create procedure GetAllServices()
BEGIN
    SELECT titulo              AS name,
           id                  AS id,
           costo               AS costPrice,
           venta               AS sellPrice,
           duracionEnMinutos   AS durationOnMinutes,
           toleranciaEnMinutos AS toleranceOnMinutes,
           suceptibleEnCambios AS susceptibleToChange
    FROM Servicios
    WHERE estatus = 1;
end;
;