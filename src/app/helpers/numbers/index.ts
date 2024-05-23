export function formatCurrency(amount: number | string) {
  let numberToParse = 0;

  try {
    numberToParse = typeof amount === "string" ? +amount : amount;
  } catch (error) {
    numberToParse = 0;
  }

  // Formatear el número como moneda con dos decimales
  const formattedAmount = numberToParse.toFixed(2);

  // Agregar el símbolo de dólar al principio
  return formattedAmount;
}

export function formatNumberPhone(numberStr: string) {
  // Extract the parts of the string
  let part1 = numberStr.slice(0, 2); // First two digits
  let part2 = numberStr.slice(2, 6); // Next four digits
  let part3 = numberStr.slice(6); // Remaining digits

  // Concatenate the parts with hyphens
  let formattedNumber = "+52 " + part1 + "-" + part2 + "-" + part3;

  return formattedNumber;
}
