import { Goal } from "./Goal.js";
import { Weight } from "./Weight.js";

export type Livestock = {
  id: number;
  animalCategoryId: number;
  endDate: string | null;
  deletedAt: string | null;
  pastureId: number;
  quantity: number;
  weights: Weight[];
  goal: Goal;
};
