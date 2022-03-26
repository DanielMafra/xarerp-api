import { prisma } from "../../../database/prismaClient";

import { Purchase } from "../../../types/Purchase";

export const createPurchaseService = {

  create: async (data: Purchase) => {
    return await prisma.purchase.create({
      data: {
        id: data.id,
        user: {
          connect: {
            id: data.user
          }
        },
        unity: {
          connect: {
            id: data.unity
          }
        },
        provider: {
          connect: {
            id: data.provider
          }
        },
        product: {
          connect: {
            id: data.product
          }
        },
        quantity: data.quantity,
        unit_price: data.unit_price,
        status: data.status
      }
    });
  },

}
