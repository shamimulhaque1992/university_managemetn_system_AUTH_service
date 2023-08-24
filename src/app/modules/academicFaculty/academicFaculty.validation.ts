import { z } from 'zod';
const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyZodSchema,
};
