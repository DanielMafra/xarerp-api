import { prisma } from "../../../database/prismaClient";

export const updatePurchaseService = {

  update: async (id: string, user: string, unity: string, provider: string, product: string, quantity: number, unit_price: number, status: number, time: string) => {
    return await prisma.purchase.update({
      where: { id },
      data: {
        user: {
          connect: {
            id: user
          }
        },
        unity: {
          connect: {
            id: unity
          }
        },
        provider: {
          connect: {
            id: provider
          }
        },
        product: {
          connect: {
            id: product
          }
        },
        quantity,
        unit_price,
        status,
        updated_at: time
      }
    });
  },

}
