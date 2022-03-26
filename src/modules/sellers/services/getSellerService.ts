import { prisma } from "../../../database/prismaClient";

export const getSellerService = {

  findAll: async () => {
    return await prisma.seller.findMany({});
  },

  findOne: async (id: string) => {
    return await prisma.seller.findUnique({
      where: { id }
    });
  },

  //list with pagination
  listAll: async (name: string, page: number) => {
    return await prisma.$transaction([
      prisma.seller.count({
        where: {
          user: {
            name: {
              contains: name,
              mode: 'insensitive'
            }
          }
        }
      }),
      prisma.seller.findMany({
        where: {
          user: {
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
