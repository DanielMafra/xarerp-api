import { prisma } from "../../../database/prismaClient";

export const deleteProductService = {

  delete: async (id: string) => {
    return await prisma.product.delete({ where: { id } });
  }

}