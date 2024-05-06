DELIMITER $$

CREATE PROCEDURE CalculateOffset(
    IN page_number INT,
    IN records_per_page INT,
    OUT offset_value INT
)
BEGIN
    SET offset_value = (page_number - 1) * records_per_page;
END$$

DELIMITER ;