import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number(),
  cost: z.number(),
  isAvailable: z.boolean(),
  preparationTime: z.number(),
  popularity: z.number(),
  allergens: z.array(z.string()),
});

export type Product = z.infer<typeof productSchema>;


