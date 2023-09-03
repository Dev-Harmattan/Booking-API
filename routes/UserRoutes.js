import express from 'express';
import { UserController } from '../controllers/UserController.js';
const router = express.Router();

router.post('/register', UserController.createUser);
router.post('/bookings/:id', UserController.bookVisit);
router.post('/bookings', UserController.getBookings);
router.post('/cancelBooking/:id', UserController.cancelBooking);
router.post('/favorites/:id', UserController.favorite);
router.post('/favorites', UserController.getFavorites);

export default router;
