import express from 'express';
import { UserController } from '../controllers/UserController.js';
import jwtCheck from '../config/auth0Config.js';
const router = express.Router();

router.post('/register', jwtCheck, UserController.createUser);
router.post('/bookings/:id', jwtCheck, UserController.bookVisit);
router.post('/bookings', UserController.getBookings);
router.post('/cancelBooking/:id', jwtCheck, UserController.cancelBooking);
router.post('/favorites/:id', jwtCheck, UserController.favorite);
router.post('/favorites', jwtCheck, UserController.getFavorites);
router.post('/userBookings/', jwtCheck, UserController.getUserBookings);

export default router;
