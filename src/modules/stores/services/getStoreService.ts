import { prisma } from "../../../database/prismaClient";

export const getStoreService = {

  findAll: async () => {
    return await prisma.store.findMany({});
  },

  findOne: async (id: string) => {
    return await prisma.store.findUnique({
      where: { id }
    });
  },

  //list with pagination
  listAll: async (name: string, page: number) => {
    return await prisma.$transaction([
      prisma.store.count({
        where: {
          name: {
            contains: name,
            mode: 'insensitive'
          }
        }
      }),
      prisma.store.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive'
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