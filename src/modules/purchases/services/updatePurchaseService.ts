import { prisma } from "../../../database/prismaClient";
import { UpdatePurchase } from "../../../types/Purchase";

type UpdatePurchaseParams = {
  id: string;
  data: UpdatePurchase;
  time: string
}

export const updatePurchaseService = {

  update: async ({ id, data, time }: UpdatePurchaseParams) => {
    return await prisma.purchase.update({
      where: { id },
      data: {
        ...data,
        updated_at: time
      }
    });
  },

}
