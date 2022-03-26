import { prisma } from "../../../database/prismaClient";
import { UpdateProvider } from "../../../types/Provider";

type UpdateProviderParams = {
  id: string;
  data: UpdateProvider;
  time: string
}

export const updateProviderService = {

  update: async ({ id, data, time }: UpdateProviderParams) => {
    return await prisma.provider.update({
      where: { id },
      data: {
        ...data,
        updated_at: time
      }
    });
  },

}