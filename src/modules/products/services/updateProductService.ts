import { prisma } from "../../../database/prismaClient";
import { UpdateProduct } from "../../../types/Product";

type UpdateProductParams = {
  id: string;
  data: UpdateProduct;
  time: string
}

export const updateProductService = {

  update: async ({ id, data, time }: UpdateProductParams) => {
    return await prisma.product.update({
      where: { id },
      data: {
        ...data,
        updated_at: time
      }
    });
  },

}