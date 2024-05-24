create procedure UpdateBlockAccount(IN id_param int, IN block_param int)
begin
    UPDATE Cuentas SET cuentaDesactivada = block_param WHERE id = id_param;
end;
;