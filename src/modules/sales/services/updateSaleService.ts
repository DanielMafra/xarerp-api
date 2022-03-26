import { prisma } from "../../../database/prismaClient";

export const updateSaleService = {

  update: async (id: string, product: string, unity: string, client: string, seller: string, carrier: string, status: number, time: string) => {
    return await prisma.sale.update({
      where: { id },
      data: {
        product: {
          connect: {
            id: product
          }
        },
        unity: {
          connect: {
            id: unity
          }
        },
        client: {
          connect: {
            id: client
          }
        },
        seller: {
          connect: {
            id: seller
          }
        },
        carrier: {
          connect: {
            id: carrier
          }
        },
        status,
        updated_at: time
      }
    });
  },

}
