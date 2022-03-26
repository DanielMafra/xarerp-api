import { prisma } from "../../../database/prismaClient";

import { User } from "../../../types/User";

export const createUserService = {

  create: async (data: User) => {
    return await prisma.user.create({
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        position: data.position,
        permissions: data.permissions,
        active: data.active,
        unity: {
          connect: {
            id: data.unity
          }
        }
      }
    });
  },

}
