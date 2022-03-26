import { prisma } from "../../../database/prismaClient";

export const getFinancialService = {

  findAll: async () => {
    return await prisma.financial.findMany({});
  },

  findOne: async (id: string) => {
    return await prisma.financial.findUnique({
      where: { id }
    });
  },

  //list with pagination
  listAll: async (name: string, page: number) => {
    return await prisma.$transaction([
      prisma.financial.count({
        where: {
          unity: {
            name: {
              contains: name,
              mode: 'insensitive'
            }
          }
        }
      }),
      prisma.financial.findMany({
        where: {
          unity: {
            name: {
              contains: name,
              mode: 'insensitive'
            }
          }
        },
        include: {
          unity: {
            select: {
              name: true
            }
          },
          user: {
            select: {
              name: true
            }
          }
        },
        skip: page * 10,
        take: 10,
        orderBy: {
          updated_at: 'desc'
        }
      })
    ]);
  },

}