import { prisma } from "../../../database/prismaClient";

export const updateUserService = {

  update: async (id: string, name: string, email: string, password: string, position: string, permissions: string, active: boolean, unity: string, time: string) => {
    return await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        position,
        permissions,
        active,
        unity: {
          connect: {
            id: unity
          }
        },
        updated_at: time
      }
    });
  },

}
