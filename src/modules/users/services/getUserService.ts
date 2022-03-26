import { prisma } from "../../../database/prismaClient";

export const getUserService = {

  findOne: async (id: string) => {
    return await prisma.user.findUnique({
      where: { id }
    });
  },

  findAll: async () => {
    return await prisma.user.findMany({});
  },

  findByEmail: async (email: string) => {
    return await prisma.user.findMany({
      where: {
        email: {
          equals: email,
          mode: 'insensitive'
        }
      }
    });
  },

  findByEmailLogin: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        name: true,
        position: true,
        active: true,
        permissions: true,
        unity: {
          select: {
            name: true
          }
        }
      }
    });
  },

  //List with pagination
  listAll: async (name: string, page: number) => {
    return await prisma.$transaction([
      prisma.user.count({
        where: {
          name: {
            contains: name,
            mode: 'insensitive'
          }
        }
      }),
      prisma.user.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive'
          }
        },
        include: {
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
