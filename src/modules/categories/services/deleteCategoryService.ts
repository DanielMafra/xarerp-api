import { prisma } from "../../../database/prismaClient";

export const deleteCategoryService = {

  delete: async (id: string) => {
    return await prisma.category.delete({ where: { id } });
  },

}