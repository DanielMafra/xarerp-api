import { prisma } from "../../../database/prismaClient";

import { Provider } from "../../../types/Provider";

export const createProviderService = {

  create: async (data: Provider) => {
    return await prisma.provider.create({ data });
  },

}
