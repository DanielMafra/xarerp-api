import { prisma } from "../../../database/prismaClient";

export const deletePurchaseService = {

  delete: async (id: string) => {
    return await prisma.purchase.delete({ where: { id } });
  }

}
