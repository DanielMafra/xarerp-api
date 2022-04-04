import { prisma } from "../../../database/prismaClient";

export const getSalesDashboardService = {
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
}