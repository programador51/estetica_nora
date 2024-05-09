create procedure GetCatalogueItem(IN id int)
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

FROM Catalogo WHERE Catalogo.id = id;
;