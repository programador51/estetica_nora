create
    definer = uclxadpcaqdi0ofu@`%` procedure AddAccount(IN telefono_param varchar(256), IN correo_param varchar(256),
                                                        IN primerNombre_param varchar(256),
                                                        IN segundoNombre_param varchar(256),
                                                        IN apellidoP_param varchar(256),
                                                        IN apellidoM_param varchar(256),
                                                        IN tipoCuenta_param varchar(256),
                                                        IN contrasena_param varchar(64), IN foto_param varchar(256))
begin


    SET @accountsFound = 0;

    SELECT COUNT(*)
    INTO @accountsFound
    FROM Cuentas
    WHERE (correo = correo_param OR telefono = telefono_param)
      AND tipoDeCuenta = tipoCuenta_param;

    #     Validate email and type account is not repeated
    IF @accountsFound > 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
                    'Utiliza otros datos para crear la cuenta, ya esta en uso el correo o teléfono';
    END IF;

    INSERT INTO Cuentas(telefono, correo, primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, tipoDeCuenta,
                        contrasena_hash, contrasena_hash_temporal, fotoPerfil,
                        cuentaDesactivada)
    VALUES (telefono_param, correo_param, primerNombre_param,
            segundoNombre_param, apellidoP_param, apellidoM_param,
            tipoCuenta_param, contrasena_param, null, foto_param, 0);

    SELECT LAST_INSERT_ID() AS id;
end;

