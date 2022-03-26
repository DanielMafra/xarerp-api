import { prisma } from "../../../database/prismaClient";
import { UpdateProduct } from "../../../types/Product";

type UpdateFinancialParams = {
  id: string;
  data: UpdateProduct;
  time: string
}

export const updateProductService = {

  update: async ({ id, data, time }: UpdateFinancialParams) => {
    return await prisma.product.update({
      where: { id },
      data: {
        ...data,
        updated_at: time
      }
    });
  },

}