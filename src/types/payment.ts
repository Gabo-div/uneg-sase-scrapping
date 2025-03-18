import { z } from "zod";

export const paymentSchema = z.object({
  date: z.string(),
  number: z.string(),
  bank: z.string(),
  amount: z.number(),
  status: z.string(),
});

export type Payment = z.infer<typeof paymentSchema>;

export const movementSchema = z.object({
  date: z.string(),
  description: z.string(),
  number: z.string(),
  debit: z.number(),
  credit: z.number(),
});

export type Movement = z.infer<typeof movementSchema>;
