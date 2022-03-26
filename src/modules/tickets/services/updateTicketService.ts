import { prisma } from "../../../database/prismaClient";

export const updateTicketService = {

  update: async (id: string, title: string, description: string, unity: string, user: string, status: number, time: string) => {
    return await prisma.ticket.update({
      where: { id },
      data: {
        title,
        description,
        unity: {
          connect: {
            id: unity
          }
        },
        user: {
          connect: {
            id: user
          }
        },
        status,
        updated_at: time
      }
    });
  },

}
