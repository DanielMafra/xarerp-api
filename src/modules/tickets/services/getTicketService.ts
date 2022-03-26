import { prisma } from "../../../database/prismaClient";

export const getTicketService = {

  findAll: async () => {
    return await prisma.ticket.findMany({});
  },

  findOne: async (id: string) => {
    return await prisma.ticket.findUnique({
      where: { id }
    });
  },

  //list with pagination
  listAll: async (title: string, page: number) => {
    return await prisma.$transaction([
      prisma.ticket.count({
        where: {
          title: {
            contains: title,
            mode: 'insensitive'
          }
        }
      }),
      prisma.ticket.findMany({
        where: {
          title: {
            contains: title,
            mode: 'insensitive'
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
