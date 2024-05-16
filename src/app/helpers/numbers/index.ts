export function formatCurrency(amount: number|string) {

  let numberToParse = 0;

  try {
    numberToParse = typeof amount === 'string' ? +amount : amount;
  } catch (error) {
    numberToParse = 0
  }

  // Formatear el número como moneda con dos decimales
  const formattedAmount = numberToParse.toFixed(2);

  // Agregar el símbolo de dólar al principio
  return formattedAmount;
}
