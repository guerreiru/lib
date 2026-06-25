export type WeightType = "VISUAL" | "PESADO" | "OBJETIVO" | "PROJETADO";

export type Weight = {
  id: number;
  createdAt: string;
  creationUser: string;
  updatedAt: string | null;
  updateUser: string | null;
  deletedAt: string | null;
  deletionUser: string | null;
  pastureId: number;
  livestockId: number;
  animalCategoryId: number;
  operationDate: string;
  weightType: WeightType;
  weight: number;
  farmId: number;
  synchronizationId: string | null;
};
