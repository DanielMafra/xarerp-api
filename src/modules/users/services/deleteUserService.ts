import { prisma } from "../../../database/prismaClient";

export const deleteUserService = {

  delete: async (id: string) => {
    return await prisma.user.delete({ where: { id } });
  }

}