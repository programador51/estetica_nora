create
    definer = uclxadpcaqdi0ofu@`%` procedure GetAccount(IN id_param int, IN correo_param varchar(256),
                                                        IN tipo_param varchar(256))
BEGIN


    SELECT *
    FROM Cuentas
    WHERE (id = id_param OR correo = correo_param)
      AND (tipoDeCuenta = tipo_param OR tipoDeCuenta = 'superAdministrador');
end;

