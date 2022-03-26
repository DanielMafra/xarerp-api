import { prisma } from "../../../database/prismaClient";

import { Financial } from "../../../types/Financial";

export const createFinancialService = {

  create: async (data: Financial) => {
    return await prisma.financial.create({
      data: {
        id: data.id,
        type: data.type,
        value: data.value,
        unity: {
          connect: {
            id: data.unity
          }
        },
        user: {
          connect: {
            id: data.user
          }
        }
      }
    });
  },

}
