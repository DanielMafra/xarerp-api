import { prisma } from "../../../database/prismaClient";

export const getDashboardService = {

  //SALES
  findSales: async (minDate: string) => {
    return await prisma.sale.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate)
        }
      },
      select: {
        product: {
          select: {
            purchase_price: true,
            sale_price: true,
            name: true,
          }
        },
        updated_at: true
      }
    });
  },

  //PRODUCTS
  findProducts: async (minDate: string, quantity: number) => {
    return await prisma.product.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate)
        }
      },
      select: {
        purchase_price: true,
        sale_price: true,
        name: true,
        sold_amount: true,
        updated_at: true
      },
      orderBy: {
        sold_amount: 'desc'
      },
      take: quantity
    });
  },

}
