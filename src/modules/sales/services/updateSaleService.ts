import { prisma } from "../../../database/prismaClient";
import { UpdateSale } from "../../../types/Sale";

type UpdateSaleParams = {
  id: string;
  data: UpdateSale;
  time: string
}

export const updateSaleService = {

  update: async ({ id, data, time }: UpdateSaleParams) => {
    return await prisma.sale.update({
      where: { id },
      data: {
        ...data,
        updated_at: time
      }
    });
  },

}
