import { prisma } from "../../../database/prismaClient";

export const deleteStoreService = {

  delete: async (id: string) => {
    return await prisma.store.delete({ where: { id } });
  }

}