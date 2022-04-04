import { prisma } from "../../../database/prismaClient";

export const getFinancialDashboardService = {
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
}