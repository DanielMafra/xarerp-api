import { prisma } from "../../../database/prismaClient";

export const updateProviderService = {

  update: async (id: string, name: string, email: string, tel: string, time: string) => {
    return await prisma.provider.update({
      where: { id },
      data: {
        name,
        email,
        tel,
        updated_at: time
      }
    });
  },

}