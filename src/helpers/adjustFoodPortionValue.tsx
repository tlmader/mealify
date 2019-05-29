/**
 * Prevents negative, invalid, or values over 1000 from being used as a food portion.
 */
export const adjustFoodPortionValue = (value: number | string | undefined): number | string =>
  value ? Math.min(Math.abs(+value), 1000) : ''