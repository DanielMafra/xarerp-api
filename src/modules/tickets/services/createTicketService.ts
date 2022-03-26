import { prisma } from "../../../database/prismaClient";

import { Ticket } from "../../../types/Ticket";

export const createTicketService = {

  create: async (data: Ticket) => {
    return await prisma.ticket.create({
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        unity: {
          connect: {
            id: data.unity
          }
        },
        user: {
          connect: {
            id: data.user
          }
        },
        status: data.status
      }
    });
  },

}
