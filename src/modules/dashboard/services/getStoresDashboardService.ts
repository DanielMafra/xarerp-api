import { prisma } from "../../../database/prismaClient";

export const getStoresDashboardService = {
  findSalesDefaultStore: async (minDate: string) => {
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
          }
        },
        unity: {
          select: {
            type: true,
            name: true
          }
        }
      }
    });
  },
}