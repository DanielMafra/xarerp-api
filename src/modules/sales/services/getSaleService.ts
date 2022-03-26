import { prisma } from "../../../database/prismaClient";

export const getSaleService = {

  findAll: async () => {
    return await prisma.sale.findMany({});
  },

  findOne: async (id: string) => {
    return await prisma.sale.findUnique({
      where: { id }
    });
  },

  //list with pagination
  listAll: async (name: string, page: number) => {
    return await prisma.$transaction([
      prisma.sale.count({
        where: {
          product: {
            name: {
              contains: name,
              mode: 'insensitive'
            }
          }
        }
      }),
      prisma.sale.findMany({
        where: {
          product: {
            name: {
              contains: name,
              mode: 'insensitive'
            }
          }
        },
        include: {
          product: {
            select: {
              name: true,
              description: true
            }
          },
          seller: {
            select: {
              user: {
                select: {
                  name: true
                }
              }
            }
          },
          unity: {
            select: {
              name: true
            }
          },
          client: {
            select: {
              name: true,
              city: true,
              state: true
            }
          },
          carrier: {
            select: {
              name: true,
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
