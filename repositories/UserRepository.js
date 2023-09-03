import { prisma } from '../config/prismaConfig.js';

class UserRepository {
  static async getUniqueUser(query) {
    return await prisma.user.findUnique({ ...query });
  }

  static async createUser(data) {
    return await prisma.user.create({
      data: data,
    });
  }

  static async updateUser(query) {
    return await prisma.user.update({ ...query });
  }
}

export { UserRepository };
