import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import carRoutes from './car.routes';
import orderRoutes from './order.routes';

const router = Router();

// Module Routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/cars', carRoutes);
router.use('/orders', orderRoutes);

export default router;