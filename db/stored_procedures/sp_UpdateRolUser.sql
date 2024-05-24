create procedure UpdateUserRol(IN id_param int, IN rol_param VARCHAR(256))
begin
    UPDATE Cuentas SET tipoDeCuenta = rol_param WHERE Cuentas.id = id_param;
end;
;