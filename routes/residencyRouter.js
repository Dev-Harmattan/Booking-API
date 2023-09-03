import express from 'express';
import { ResidencyController } from '../controllers/residencyController.js';
const router = express.Router();
//api: /app/v1/residency
router.post('/create', ResidencyController.createResidency);
router.get('/', ResidencyController.getResidencies);
router.get('/:id', ResidencyController.getResidencyById);

export default router;
