export interface FoodItem {
  id: string;
  name: string;
  calories: number; // `calories` is number of calories per 100g
  portion: number; // `portion` is size of a single portion in grams.
}