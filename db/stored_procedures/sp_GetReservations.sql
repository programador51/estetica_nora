create procedure GetReservations(IN page_number int)
BEGIN
    DECLARE rows_per_page INT;
    DECLARE total_records INT;
    DECLARE offset_value INT;
    DECLARE total_pages INT;

    SET rows_per_page = 10;

    CALL CalculateOffset(page_number, rows_per_page, offset_value);

    -- Get total number of records
    SELECT COUNT(*) INTO total_records FROM Reservaciones;

    -- Retrieve paginated records    -- Retrieve paginated records
    SELECT cuenta,
           total,
           nombre,
           fechaReservacion,
           hasta,
           administrador,
           estatus,
           id
    FROM Reservaciones    ORDER BY id DESC
    LIMIT rows_per_page OFFSET offset_value;

    CALL CalculateTotalPages(total_records, rows_per_page, total_pages);

    SELECT total_records AS total_records, total_pages;
end;
;