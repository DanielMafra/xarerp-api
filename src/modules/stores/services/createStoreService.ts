import { prisma } from "../../../database/prismaClient";

import { Store } from "../../../types/Store";

export const createStoreService = {

  create: async (data: Store) => {
    return await prisma.store.create({ data });
  },

}