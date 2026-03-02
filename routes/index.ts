import { Router } from 'express';
import v1Routes from './v1/index.ts';

const router = Router();

// Mount version 1 API
router.use('/api/v1', v1Routes);

export default router;