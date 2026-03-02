import { Router } from 'express';
import { AuthController } from '../../modules/auth/presentation/auth.controller';
import { validate } from '../../middleware/validation.middleware';
import { loginSchema, registerSchema } from '../../modules/auth/presentation/auth.validation';

const router = Router();
const authController = new AuthController();

router.post('/register', validate(registerSchema), authController.register.bind(authController));
router.post('/login', validate(loginSchema), authController.login.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));

export default router;