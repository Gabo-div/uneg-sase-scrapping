import { z } from "zod";

export const teacherSchema = z.object({
  courseId: z.string(),
  courseSection: z.number(),
  ci: z.string(),
  name: z.string(),
});

export type Teacher = z.infer<typeof teacherSchema>;
