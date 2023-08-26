import { z } from 'zod';
const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});
const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    code: z
      .string({
        required_error: 'code is required',
      })
      .optional(),
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
};
