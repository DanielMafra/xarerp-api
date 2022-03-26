import { prisma } from "../../../database/prismaClient";

export const getProductService = {

  findAll: async () => {
    return await prisma.product.findMany({});
  },

  findOne: async (id: string) => {
    return await prisma.product.findUnique({
      where: { id }
    });
  },

  //list with pagination
  listAll: async (name: string, page: number) => {
    return await prisma.$transaction([
      prisma.product.count({
        where: {
          name: {
            contains: name,
            mode: 'insensitive'
          }
        }
      }),
      prisma.product.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive'
          }
        },
        include: {
          category: {
            select: {
              title: true
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