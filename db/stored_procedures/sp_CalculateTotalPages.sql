create
    definer = uclxadpcaqdi0ofu@`%` procedure CalculateTotalPages(IN total_records int, IN records_per_page int, OUT total_pages int)
BEGIN
    SET total_pages = CEIL(total_records / records_per_page);
END;

