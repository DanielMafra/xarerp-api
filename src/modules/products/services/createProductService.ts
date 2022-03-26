import { prisma } from "../../../database/prismaClient";

import { Product } from "../../../types/Product";

export const createProductService = {

  create: async (data: Product) => {
    return await prisma.product.create({
      data: {
        id: data.id,
        name: data.name,
        description: data.description,
        purchase_price: data.purchase_price,
        sale_price: data.sale_price,
        category: {
          connect: {
            id: data.category
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
        user: {
          connect: {
            id: data.user
          }
        },
        lot: data.lot,
        validity: data.validity,
        quantity: data.quantity
      }
    });
  },

}