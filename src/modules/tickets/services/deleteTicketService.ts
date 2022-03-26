import { prisma } from "../../../database/prismaClient";

export const deleteTicketService = {

  delete: async (id: string) => {
    return await prisma.ticket.delete({ where: { id } });
  }

}
