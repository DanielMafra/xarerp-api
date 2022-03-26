import { prisma } from "../../../database/prismaClient";

export const updateProductService = {

  update: async (id: string, name: string, description: string, purchase_price: number, sale_price: number, category: string, unity: string, provider: string, user: string, lot: number, validity: Date, quantity: number, time: string) => {
    return await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        purchase_price,
        sale_price,
        category: {
          connect: {
            id: category
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
        user: {
          connect: {
            id: user
          }
        },
        lot,
        validity,
        quantity,
        updated_at: time
      }
    });
  },

}