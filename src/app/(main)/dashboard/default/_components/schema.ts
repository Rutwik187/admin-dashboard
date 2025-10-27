import { z } from "zod";

export const sectionSchema = z.object({
  id: z.number(),
  itemName: z.string(),
  category: z.string(),
  quantity: z.number(),
  unit: z.string(),
  reorderLevel: z.number(),
  supplier: z.string(),
  lastRestocked: z.string(),
  status: z.string(),
});
