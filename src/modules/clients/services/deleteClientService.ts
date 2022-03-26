import { prisma } from "../../../database/prismaClient";

export const deleteClientService = {

  delete: async (id: string) => {
    return await prisma.client.delete({ where: { id } });
  }

}