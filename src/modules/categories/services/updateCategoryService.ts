import { prisma } from "../../../database/prismaClient";

export const updateCategoryService = {

  update: async (id: string, title: string, time: string) => {
    return await prisma.category.update({
      where: { id },
      data: {
        title,
        updated_at: time
      }
    });
  },

}
