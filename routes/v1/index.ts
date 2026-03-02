import { Router } from 'express';
import authRoutes from './auth.routes.ts';
import userRoutes from './user.routes.ts';
import carRoutes from './car.routes.ts';
import orderRoutes from './order.routes.ts';

const router = Router();

// Module Routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/cars', carRoutes);
router.use('/orders', orderRoutes);

export default router;