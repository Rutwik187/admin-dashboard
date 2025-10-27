import { z } from "zod";

export const supplierSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  contactPerson: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  rating: z.number(),
  totalOrders: z.number(),
  lastOrderDate: z.string(),
  status: z.enum(["Active", "Inactive", "On Hold"]),
});

export type Supplier = z.infer<typeof supplierSchema>;


