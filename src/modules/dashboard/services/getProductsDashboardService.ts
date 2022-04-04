import { prisma } from "../../../database/prismaClient";

export const getProductsDashboardService = {
  findProducts: async (quantity: number) => {
    return await prisma.product.findMany({
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