import { Router } from 'express';
import { AuthController } from '../../modules/auth/presentation/auth.controller.ts';
import { validateBody } from '../../middleware/validation.middleware.ts';
import { registerSchema, loginSchema, refreshSchema } from '../../modules/auth/presentation/auth.validation.ts';

const router = Router();
const authController = new AuthController();

// Register route with validation
router.post('/register', validateBody(registerSchema), authController.register);

// Login route with validation
router.post('/login', validateBody(loginSchema), authController.login);

// Refresh token route with validation
router.post('/refresh-token', validateBody(refreshSchema), authController.refreshToken);

export default router;