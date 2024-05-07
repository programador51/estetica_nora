create
    definer = uclxadpcaqdi0ofu@`%` procedure GetCatalogue(IN page_number int)
BEGIN
    DECLARE rows_per_page INT;
    DECLARE total_records INT;
    DECLARE offset_value INT;
    DECLARE total_pages INT;

    SET rows_per_page = 50;

    CALL CalculateOffset(page_number, 50, offset_value);

    -- Get total number of records
    SELECT COUNT(*) INTO total_records FROM Catalogo;

    -- Retrieve paginated records
    SELECT Catalogo.id,
           Catalogo.descripcion,
           Catalogo.venta,
           Catalogo.costo,
           Catalogo.stockDisponible,
           Catalogo.titulo,
IFNULL(
                   (SELECT JSON_ARRAYAGG(urlFoto)
                    FROM Galeria
                    WHERE Galeria.idEntidad = Catalogo.id
                      AND Galeria.tipo = 'catalogo'
                      AND Galeria.estatus = 1),
                   JSON_ARRAY()
           ) AS imagen

    FROM Catalogo

    LIMIT rows_per_page OFFSET offset_value;

    CALL CalculateTotalPages(total_records, rows_per_page, total_pages);

    SELECT total_records AS total_records, total_pages;
END;

