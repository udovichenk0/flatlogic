export function averageRate(rates: number[]) {
  let average = Math.round(
    rates.reduce((acc, prev) => acc + prev, 0) / rates.length
  );
  return average;
}
