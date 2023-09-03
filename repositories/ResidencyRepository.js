import { prisma } from '../config/prismaConfig.js';

class ResidencyRepository {
  static async createResidency(data) {
    return await prisma.residency.create({
      data: data,
    });
  }

  static async getResidencies() {
    return await prisma.residency.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async getResidencyById(id) {
    return await prisma.residency.findUnique({
      where: {
        id: id,
      },
    });
  }
}

export { ResidencyRepository };
