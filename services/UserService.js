import { query } from 'express';
import { ApiResponse } from '../models/ApiResponse.js';
import { UserRepository } from '../repositories/UserRepository.js';

class UserService {
  static async createUser(req) {
    const { email } = req.body;
    const query = {
      where: {
        email: email,
      },
    };
    const user = await UserRepository.getUniqueUser(query);
    if (user) {
      throw ApiResponse.Forbidden({
        userMessage: 'User already registered',
        developerMessage: 'User already exists',
      });
    }
    return await UserRepository.createUser(req.body);
  }

  static async getUserBookings(email) {
    const userQuery = {
      where: {
        email: email,
      },
      select: { bookedVisits: true },
    };
    return await UserRepository.getUniqueUser(userQuery);
  }

  static async bookVisit(req, id, email, date) {
    const userQuery = {
      where: {
        email: email,
      },
      select: { bookedVisits: true },
    };

    const updateQuery = {
      where: { email },
      data: {
        bookedVisits: { push: { id, date } },
      },
    };
    const user = await UserRepository.getUniqueUser(userQuery);
    const isExistBooking = user.bookedVisits.some((visit) => visit.id === id);
    if (isExistBooking) {
      throw ApiResponse.Forbidden({
        userMessage: 'You have already booked this visit',
        developerMessage: 'You have already booked this visit',
      });
    }
    return await UserRepository.updateUser(updateQuery);
  }

  static async getBookings(req, email) {
    const query = {
      where: {
        email: email,
      },
      select: { bookedVisits: true },
    };
    return await UserRepository.getUniqueUser(query);
  }

  static async cancelBooking(req, id, email) {
    const userQuery = {
      where: {
        email: email,
      },
      select: { bookedVisits: true },
    };

    const userBookedVisits = await UserRepository.getUniqueUser(userQuery);

    const bookedVisitIndex = userBookedVisits.bookedVisits.findIndex(
      (visit) => visit.id === id
    );
    if (bookedVisitIndex === -1) {
      throw ApiResponse.NotFound({
        userMessage: 'Booking not found',
        developerMessage: 'Booking not found',
      });
    }

    userBookedVisits.bookedVisits.splice(bookedVisitIndex, 1);

    const updateQuery = {
      where: { email },
      data: {
        bookedVisits: userBookedVisits.bookedVisits,
      },
    };

    return await UserRepository.updateUser(updateQuery);
  }

  static async favorite(req, id, email) {
    let updateQuery;
    const query = {
      where: {
        email: email,
      },
    };
    const user = await UserRepository.getUniqueUser(query);

    if (user.favResidenciesID.includes(id)) {
      const filteredFavorites = user.favResidenciesID.filter((f) => f !== id);
      updateQuery = {
        where: { email },
        data: {
          favResidenciesID: {
            set: filteredFavorites,
          },
        },
      };
      return await UserRepository.updateUser(updateQuery);
    } else {
      updateQuery = {
        where: { email },
        data: {
          favResidenciesID: {
            push: id,
          },
        },
      };
      return await UserRepository.updateUser(updateQuery);
    }
  }

  static async getFavorites(req, email) {
    const query = {
      where: {
        email: email,
      },
      select: { favResidenciesID: true },
    };
    const fav = await UserRepository.getUniqueUser(query);
    return fav;
  }
}

export { UserService };
