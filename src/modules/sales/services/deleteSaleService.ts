import { prisma } from "../../../database/prismaClient";

export const deleteSaleService = {

  delete: async (id: string) => {
    return await prisma.sale.delete({ where: { id } });
  }

}
