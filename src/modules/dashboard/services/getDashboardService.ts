import { prisma } from "../../../database/prismaClient";

export const getDashboardService = {

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
            sale_price: true
          }
        },
        updated_at: true
      }
    });
  },

}