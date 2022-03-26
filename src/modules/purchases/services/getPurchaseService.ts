import { prisma } from "../../../database/prismaClient";

export const getPurchaseService = {

  findAll: async () => {
    return await prisma.purchase.findMany({});
  },

  findOne: async (id: string) => {
    return await prisma.purchase.findUnique({
      where: { id }
    });
  },

  //list with pagination
  listAll: async (name: string, page: number) => {
    return await prisma.$transaction([
      prisma.purchase.count({
        where: {
          product: {
            name: {
              contains: name,
              mode: 'insensitive'
            }
          }
        }
      }),
      prisma.purchase.findMany({
        where: {
          product: {
            name: {
              contains: name,
              mode: 'insensitive'
            }
          }
        },
        include: {
          user: {
            select: {
              name: true
            }
          },
          product: {
            select: {
              name: true,
              description: true
            }
          },
          unity: {
            select: {
              name: true
            }
          },
          provider: {
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
