import { prisma } from "../../../database/prismaClient";

export const updateSellerService = {

  update: async (id: string, commission: number, user: string, time: string) => {
    return await prisma.seller.update({
      where: { id },
      data: {
        commission,
        user: {
          connect: {
            id: user
          }
        },
        updated_at: time
      }
    });
  },

}
