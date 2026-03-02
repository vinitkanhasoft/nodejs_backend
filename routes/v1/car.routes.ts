import { Router } from 'express';
import { CarController } from '../../modules/car/presentation/car.controller.ts';
import { validateBody, validateQuery } from '../../middleware/validation.middleware.ts';
import {
  createCarSchema,
  updateCarSchema,
  searchCarSchema,
} from '../../modules/car/presentation/car.validation.ts';

const router = Router();
const controller = new CarController();

// CRUD Routes with validation
router.post('/', validateBody(createCarSchema), controller.create);
router.put('/:id', validateBody(updateCarSchema), controller.update);
router.delete('/:id', controller.delete);
router.get('/', validateQuery(searchCarSchema), controller.search);
router.get('/analytics', controller.analytics);

export default router;