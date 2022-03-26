import { prisma } from "../../../database/prismaClient";

import { Carrier } from "../../../types/Carrier";

export const createCarrierService = {

  create: async (data: Carrier) => {
    return await prisma.carrier.create({ data });
  },

}