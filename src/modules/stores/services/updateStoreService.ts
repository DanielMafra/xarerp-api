import { prisma } from "../../../database/prismaClient";
import { UpdateStore } from "../../../types/Store";

type UpdateStoreParams = {
  id: string;
  data: UpdateStore;
  time: string
}

export const updateStoreService = {

  update: async ({ id, data, time }: UpdateStoreParams) => {
    return await prisma.store.update({
      where: { id },
      data: {
        ...data,
        updated_at: time
      }
    });
  },

}