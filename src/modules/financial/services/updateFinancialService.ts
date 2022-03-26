import { prisma } from "../../../database/prismaClient";
import { UpdateFinancial } from "../../../types/Financial";

type UpdateFinancialParams = {
  id: string;
  data: UpdateFinancial;
  time: string
}

export const updateFinancialService = {

  update: async ({ id, data, time }: UpdateFinancialParams) => {
    return await prisma.financial.update({
      where: { id },
      data: {
        ...data,
        updated_at: time
      }
    });
  },

}