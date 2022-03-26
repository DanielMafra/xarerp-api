import { prisma } from "../../../database/prismaClient";

import { Seller } from "../../../types/Seller";

export const createSellerService = {

  create: async (data: Seller) => {
    return await prisma.seller.create({
      data: {
        id: data.id,
        commission: data.comission,
        user: {
          connect: {
            id: data.user
          }
        }
      }
    });
  },

}
