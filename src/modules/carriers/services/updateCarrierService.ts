import { prisma } from "../../../database/prismaClient";

export const updateCarrierService = {

  update: async (id: string, name: string, region: string, time: string) => {
    return await prisma.carrier.update({
      where: { id },
      data: {
        name,
        region,
        updated_at: time
      }
    });
  },

}
