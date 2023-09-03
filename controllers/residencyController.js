import asyncHandler from 'express-async-handler';
import { ResidencyService } from '../services/residencyService.js';
import util from '../helpers/util.js';
import { ApiResponse } from '../models/ApiResponse.js';

class ResidencyController {
  static createResidency = asyncHandler(async (req, res, next) => {
    try {
      const {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        userEmail,
      } = req.body.data;

      const data = {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        owner: { connect: { email: userEmail } },
      };
      const residency = await ResidencyService.createResidency(req, data);
      res.status(util.CREATED).json(ApiResponse.OK({ data: residency }));
    } catch (error) {
      if (error.code === 'P2002') {
        error.developerMessage = error.userMessage =
          'A residency with the address already exists';
      }
      next(error);
    }
  });

  static getResidencies = asyncHandler(async (req, res, next) => {
    try {
      const residencies = await ResidencyService.getResidencies();
      res.status(util.OK).json(ApiResponse.OK({ data: residencies }));
    } catch (error) {
      next(error);
    }
  });

  static getResidencyById = asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const residency = await ResidencyService.getResidencyById(id);
      res.status(util.OK).json(ApiResponse.OK({ data: residency }));
    } catch (error) {
      next(error);
    }
  });
}

export { ResidencyController };
