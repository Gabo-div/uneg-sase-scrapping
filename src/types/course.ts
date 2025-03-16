import { z } from "zod";

export const courseSchema = z.object({
  id: z.string(),
  semester: z.number().nullable(),
  name: z.string(),
  uc: z.number(),
  required: z.array(z.string()),
  semesterRequired: z.number().nullable(),
});

export type Course = z.infer<typeof courseSchema>;

export const registeredCourseSchema = z.object({
  courseId: z.string(),
  section: z.string(),
  teacherName: z.string().nullable(),
  teacherEmail: z.string().nullable(),
});

export type RegisteredCourse = z.infer<typeof registeredCourseSchema>;

export const approvedCourseSchema = z.object({
  courseId: z.string(),
  calification: z.number(),
});

export type ApprovedCourse = z.infer<typeof approvedCourseSchema>;

export const disapprovedCourseSchema = z.object({
  courseId: z.string(),
  times: z.number(),
  pending: z.boolean(),
});

export type DisapprovedCourse = z.infer<typeof disapprovedCourseSchema>;

export const coursesInfoSchema = z.object({
  courses: z.array(courseSchema),
  registered: z.array(registeredCourseSchema),
  approved: z.array(approvedCourseSchema),
  disapproved: z.array(disapprovedCourseSchema),
});

export type CoursesInfo = z.infer<typeof coursesInfoSchema>;
