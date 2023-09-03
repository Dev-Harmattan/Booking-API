import { ResidencyRepository } from '../repositories/ResidencyRepository.js';

class ResidencyService {
  static async createResidency(req, data) {
    return ResidencyRepository.createResidency(data);
  }

  static async getResidencies() {
    return ResidencyRepository.getResidencies();
  }

  static async getResidencyById(id) {
    return ResidencyRepository.getResidencyById(id);
  }
}

export { ResidencyService };
