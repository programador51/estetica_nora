create procedure UpdateCatalogue(IN descripcion_param longtext, IN venta_param decimal(10, 2),
                                 IN costo_param decimal(10, 2),
                                 IN stockDisponible_param int, IN titulo_param varchar(256), IN id_param int)
UPDATE Catalogo
SET Catalogo.descripcion     = descripcion_param,
    Catalogo.venta           = venta_param,
    Catalogo.costo           = costo_param,
    Catalogo.stockDisponible = stockDisponible_param,
    Catalogo.titulo          = titulo_param
WHERE Catalogo.id = id_param
;