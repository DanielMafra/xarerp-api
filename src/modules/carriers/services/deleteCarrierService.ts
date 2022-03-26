import { prisma } from "../../../database/prismaClient";

export const deleteCarrierService = {

  delete: async (id: string) => {
    return await prisma.carrier.delete({ where: { id } });
  },

}