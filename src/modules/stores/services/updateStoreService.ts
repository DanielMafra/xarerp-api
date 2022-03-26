import { prisma } from "../../../database/prismaClient";

export const updateStoreService = {

  update: async (id: string, name: string, type: string, time: string) => {
    return await prisma.store.update({
      where: { id },
      data: {
        name,
        type,
        updated_at: time
      }
    });
  },

}