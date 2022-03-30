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

  //FINANCIAL
  findFinancial: async (minDate: string) => {
    return await prisma.financial.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate)
        }
      },
      select: {
        type: true,
        value: true,
        updated_at: true
      }
    });
  },

  //PURCHASES
  findPurchases: async (minDate: string) => {
    return await prisma.purchase.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate)
        }
      },
      select: {
        quantity: true,
        unit_price: true,
        updated_at: true
      }
    });
  },
}
