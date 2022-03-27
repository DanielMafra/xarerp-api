import { prisma } from "../../../database/prismaClient";
import { UpdateTicket } from "../../../types/Ticket";

type UpdateTicketParams = {
  id: string;
  data: UpdateTicket;
  time: string
}

export const updateTicketService = {

  update: async ({ id, data, time }: UpdateTicketParams) => {
    return await prisma.ticket.update({
      where: { id },
      data: {
        ...data,
        updated_at: time
      }
    });
  },

}
