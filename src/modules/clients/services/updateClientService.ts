import { prisma } from "../../../database/prismaClient";
import { UpdateClient } from "../../../types/Client";

type UpdateClientParams = {
  id: string;
  data: UpdateClient;
  time: string
}

export const updateClientService = {

  update: async ({ id, data, time }: UpdateClientParams) => {
    return await prisma.client.update({
      where: { id },
      data: {
        ...data,
        updated_at: time
      }
    });
  },

}