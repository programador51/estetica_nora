create procedure GetServices(IN page_param int)
BEGIN
    DECLARE rows_per_page INT;
    DECLARE total_records INT;
    DECLARE offset_value INT;
    DECLARE total_pages INT;

    SET rows_per_page = 10;

    CALL CalculateOffset(page_number, rows_per_page, offset_value);

    -- Get total number of records
    SELECT COUNT(*) INTO total_records FROM Servicios WHERE Servicios.estatus = 1;

    -- Retrieve paginated records
    SELECT Servicios.id,
           Servicios.descripcion,
           Servicios.venta,
           Servicios.costo,
           Servicios.suceptibleEnCambios,
           Servicios.titulo,

           IFNULL(
                   (SELECT JSON_ARRAYAGG(urlFoto)
                    FROM Galeria
                    WHERE Galeria.idEntidad = Servicios.id
                      AND Galeria.tipo = 'servicios'
                      AND Galeria.estatus = 1),
                   JSON_ARRAY()
           ) AS imagen

    FROM Servicios

    WHERE Servicios.estatus = 1

    ORDER BY Servicios.id DESC

    LIMIT rows_per_page OFFSET offset_value;

    CALL CalculateTotalPages(total_records, rows_per_page, total_pages);

    SELECT total_records AS total_records, total_pages;
end;
;