import { prisma } from "../../../database/prismaClient";

export const getCategoryService = {

  findAll: async () => {
    return await prisma.category.findMany({});
  },

  findOne: async (id: string) => {
    return await prisma.category.findUnique({
      where: { id }
    });
  },

  findByTitle: async (title: string) => {
    return await prisma.category.findMany({
      where: {
        title: {
          equals: title,
          mode: 'insensitive'
        }
      }
    });
  },

}
