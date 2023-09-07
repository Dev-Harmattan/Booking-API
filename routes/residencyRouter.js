import express from 'express';
import { ResidencyController } from '../controllers/residencyController.js';
import jwtCheck from '../config/auth0Config.js';
const router = express.Router();
//api: /app/v1/residency
router.post('/create', jwtCheck, ResidencyController.createResidency);
router.get('/', ResidencyController.getResidencies);
router.get('/:id', ResidencyController.getResidencyById);

export default router;
