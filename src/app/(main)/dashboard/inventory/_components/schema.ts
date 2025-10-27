import { z } from "zod";

export const inventoryItemSchema = z.object({
  id: z.string(),
  itemName: z.string(),
  category: z.string(),
  quantity: z.number(),
  unit: z.string(),
  reorderLevel: z.number(),
  costPerUnit: z.number(),
  supplier: z.string(),
  lastRestocked: z.string(),
  status: z.enum(["In Stock", "Low Stock", "Out of Stock"]),
});

export type InventoryItem = z.infer<typeof inventoryItemSchema>;


