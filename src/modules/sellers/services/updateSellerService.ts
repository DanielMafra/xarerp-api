import { prisma } from "../../../database/prismaClient";
import { UpdateSeller } from '../../../types/Seller'

type UpdateSellerParams = {
  id: string;
  data: UpdateSeller;
  time: string
}

export const updateSellerService = {

  update: async ({ id, data, time }: UpdateSellerParams) => {
    return await prisma.seller.update({
      where: { id },
      data: {
        ...data,
        updated_at: time
      }
    });
  },

}
