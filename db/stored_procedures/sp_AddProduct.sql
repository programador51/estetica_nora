DELIMITER //

CREATE PROCEDURE InsertIntoCatalogo(
    IN descripcion_param LONGTEXT,
    IN venta_param DECIMAL(10,2),
    IN costo_param DECIMAL(10,2),
    IN stockDisponible_param INT,
    IN titulo_param VARCHAR(256)
)
BEGIN
    INSERT INTO Catalogo (descripcion, venta, costo, stockDisponible,titulo)
    VALUES (descripcion_param, venta_param, costo_param, stockDisponible_param,titulo_param);

    SELECT LAST_INSERT_ID() AS id;
END //

DELIMITER ;
