import asyncHandler from 'express-async-handler';
import { UserService } from '../services/UserService.js';
import util from '../helpers/util.js';
import { ApiResponse } from '../models/ApiResponse.js';

class UserController {
  static createUser = asyncHandler(async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await UserService.createUser(req);
      return res.status(util.OK).json(ApiResponse.OK({ data: user }));
    } catch (error) {
      next(error);
    }
  });

  static getUserBookings = asyncHandler(async (req, res, next) => {
    try {
      const { userEmail } = req.body;
      const userBookings = await UserService.getUserBookings(userEmail);
      res.status(util.OK).json(ApiResponse.OK({ data: userBookings }));
    } catch (error) {
      next(error);
    }
  });

  static bookVisit = asyncHandler(async (req, res, next) => {
    try {
      const { email, date } = req.body;
      const { id } = req.params;
      const bookedVisit = await UserService.bookVisit(req, id, email, date);
      res.status(util.CREATED).json(ApiResponse.OK({ data: bookedVisit }));
    } catch (error) {
      next(error);
    }
  });

  static getBookings = asyncHandler(async (req, res, next) => {
    try {
      const { email } = req.body;
      const bookings = await UserService.getBookings(req, email);
      res.status(util.OK).json(ApiResponse.OK({ data: bookings }));
    } catch (error) {
      next(error);
    }
  });

  static cancelBooking = asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { email } = req.body;
      const cancelledBooking = await UserService.cancelBooking(req, id, email);
      res.status(util.OK).json(
        ApiResponse.OK({
          data: cancelledBooking,
          userMessage: 'Booking cancel successfully',
        })
      );
    } catch (error) {
      next(error);
    }
  });

  static favorite = asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { email } = req.body;
      const favorite = await UserService.favorite(req, id, email);
      res.status(util.OK).json(
        ApiResponse.OK({
          data: favorite,
          userMessage: 'Update favorite successfully',
        })
      );
    } catch (error) {
      next(error);
    }
  });

  static getFavorites = asyncHandler(async (req, res, next) => {
    try {
      const { email } = req.body;
      const favorites = await UserService.getFavorites(req, email);
      res.status(util.OK).json(ApiResponse.OK({ data: favorites }));
    } catch (error) {
      next(error);
    }
  });
}

export { UserController };
