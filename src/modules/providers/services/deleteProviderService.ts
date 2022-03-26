import { prisma } from "../../../database/prismaClient";

export const deleteProviderService = {

  delete: async (id: string) => {
    return await prisma.provider.delete({ where: { id } });
  },

}