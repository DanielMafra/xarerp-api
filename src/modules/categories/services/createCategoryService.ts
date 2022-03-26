import { prisma } from "../../../database/prismaClient";

import { Category } from "../../../types/Category";

export const createCategoryService = {

  create: async (data: Category) => {
    return await prisma.category.create({ data });
  },

}
