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
      },
      orderBy: {
        updated_at: 'asc'
      }
    });
  },

  findLastSales: async (minDate: string) => {
    return await prisma.sale.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate)
        }
      },
      select: {
        product: {
          select: {
            sale_price: true,
            name: true
          }
        },
        unity: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        updated_at: 'desc'
      },
      take: 15
    })
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
      },
      orderBy: {
        updated_at: 'asc'
      }
    });
  },

  //STORES
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
