import { prisma } from "../../../database/prismaClient";

import { Sale } from "../../../types/Sale";

export const createSaleService = {

  create: async (data: Sale) => {
    return await prisma.sale.create({
      data: {
        id: data.id,
        product: {
          connect: {
            id: data.product
          }
        },
        unity: {
          connect: {
            id: data.unity
          }
        },
        client: {
          connect: {
            id: data.client
          }
        },
        seller: {
          connect: {
            id: data.seller
          }
        },
        carrier: {
          connect: {
            id: data.carrier
          }
        },
        status: data.status
      }
    });
  },

}
