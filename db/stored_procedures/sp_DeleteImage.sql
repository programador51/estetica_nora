create procedure DeleteImage(IN urlFoto_param text, IN idEntidad_param INT)

DELETE
FROM Galeria
WHERE urlFoto = urlFoto_param
  AND idEntidad = idEntidad_param
;