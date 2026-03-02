import { Router } from 'express';
import { CarController } from '../../modules/car/presentation/car.controller';
import { validateBody, validateQuery } from '../../middleware/validation.middleware';
import {
  createCarSchema,
  updateCarSchema,
  searchCarSchema,
} from '../../modules/car/presentation/car.validation';

const router = Router();
const controller = new CarController();

// CRUD Routes with validation
router.post('/', validateBody(createCarSchema), controller.create);
router.put('/:id', validateBody(updateCarSchema), controller.update);
router.delete('/:id', controller.delete);
router.get('/', validateQuery(searchCarSchema), controller.search);
router.get('/analytics', controller.analytics);

export default router;