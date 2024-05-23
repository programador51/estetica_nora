create procedure GetAllAccounts()
begin
    SELECT * FROM Cuentas WHERE Cuentas.cuentaDesactivada = 0;
end;
;