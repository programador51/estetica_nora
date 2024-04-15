export function formatCurrency(amount: number) {
  // Formatear el número como moneda con dos decimales
  const formattedAmount = amount.toFixed(2);

  // Agregar el símbolo de dólar al principio
  return formattedAmount;
}
