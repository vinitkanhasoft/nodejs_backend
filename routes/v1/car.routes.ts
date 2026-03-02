import { Router } from 'express';
import { CarController } from '../../modules/car/presentation/car.controller';
import { validate } from '../../middleware/validation.middleware';
import {
  createCarSchema,
  updateCarSchema,
  searchCarSchema,
} from '../../modules/car/presentation/car.validation';

const router = Router();
const controller = new CarController();

// CRUD Routes
router.post('/', validate(createCarSchema), controller.create.bind(controller));
router.put('/:id', validate(updateCarSchema), controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));
router.get('/', validate(searchCarSchema), controller.search.bind(controller));
router.get('/analytics', controller.analytics.bind(controller));

export default router;