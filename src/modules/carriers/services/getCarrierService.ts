import { prisma } from "../../../database/prismaClient";

export const getCarrierService = {

  findAll: async () => {
    return await prisma.carrier.findMany({});
  },

  findAllWithPagination: async (page: number) => {
    return await prisma.$transaction([
      prisma.carrier.count(),
      prisma.carrier.findMany({
        skip: page * 10,
        take: 10,
        orderBy: {
          updated_at: 'desc'
        }
      })
    ]);
  },

  findOne: async (id: string) => {
    return await prisma.carrier.findUnique({
      where: { id }
    });
  },

  findByName: async (name: string) => {
    return await prisma.carrier.findMany({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        }
      }
    });
  },

  //list with pagination
  listAll: async (name: string, page: number) => {
    return await prisma.$transaction([
      prisma.carrier.count({
        where: {
          name: {
            contains: name,
            mode: 'insensitive'
          }
        }
      }),
      prisma.carrier.findMany({
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
  }

}
