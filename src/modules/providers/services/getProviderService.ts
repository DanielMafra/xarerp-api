import { prisma } from "../../../database/prismaClient";

export const getProviderService = {

  findAll: async () => {
    return await prisma.provider.findMany({});
  },

  findOne: async (id: string) => {
    return await prisma.provider.findUnique({
      where: { id }
    });
  },

  findByEmail: async (email: string) => {
    return await prisma.provider.findMany({
      where: {
        email: {
          equals: email,
          mode: 'insensitive'
        }
      }
    });
  },

  findByTel: async (tel: string) => {
    return await prisma.provider.findMany({
      where: {
        tel: {
          equals: tel,
          mode: 'insensitive'
        }
      }
    });
  },

  //list with pagination
  listAll: async (name: string, page: number) => {
    return await prisma.$transaction([
      prisma.provider.count({
        where: {
          name: {
            contains: name,
            mode: 'insensitive'
          }
        }
      }),
      prisma.provider.findMany({
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
