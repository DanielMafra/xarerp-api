import { prisma } from "../../../database/prismaClient";

export const deleteSellerService = {

  delete: async (id: string) => {
    return await prisma.seller.delete({ where: { id } });
  }

}
