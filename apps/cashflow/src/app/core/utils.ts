/** Get the month period based on day value */
export function getPeriod(dayValue: number): 1 | 2 | null {
  if ((dayValue >= 1 && dayValue <= 15) || dayValue === 31) {
    return 1;
  } else if (dayValue >= 16 && dayValue <= 30) {
    return 2;
  }

  return null;
}
