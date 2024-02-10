import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
const router = express.Router();

// router.get('/:id', AdminController.getSingleAdmin);
// router.get('/', AdminController.getAllAdmins);

// router.delete('/:id', AdminController.deleteAdmin);

// router.patch(
//   '/:id',
//   validateRequest(AdminValidation.updateAdmin),
//   AdminController.updateAdmin
// );
router.post(
  '/login',
  validateRequest(AuthValidation.loginSchema),
  AuthController.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
export const AuthRoutes = router;
