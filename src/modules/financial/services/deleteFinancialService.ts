import { prisma } from "../../../database/prismaClient";

export const deleteFinancialService = {

  delete: async (id: string) => {
    return await prisma.financial.delete({ where: { id } });
  }

}