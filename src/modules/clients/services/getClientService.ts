import { prisma } from "../../../database/prismaClient";

export const getClientService = {

  findAll: async () => {
    return await prisma.client.findMany({});
  },

  findOne: async (id: string) => {
    return await prisma.client.findUnique({
      where: { id }
    });
  },

  findByEmail: async (email: string) => {
    return await prisma.client.findMany({
      where: {
        email: {
          equals: email,
          mode: 'insensitive'
        }
      }
    });
  },

  findByTel: async (tel: string) => {
    return await prisma.client.findMany({
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
      prisma.client.count({
        where: {
          name: {
            contains: name,
            mode: 'insensitive'
          }
        }
      }),
      prisma.client.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive'
          }
        },
        include: {
          user: {
            select: {
              name: true
            }
          },
          unity: {
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