import { z } from 'zod';

const loginSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required!',
    }),
    password: z.string({
      required_error: 'Password is required!',
    }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token id is required!',
    }),
  }),
});

export const AuthValidation = {
  loginSchema,
  refreshTokenZodSchema,
};
