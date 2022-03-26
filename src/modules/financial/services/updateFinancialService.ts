import { prisma } from "../../../database/prismaClient";

export const updateFinancialService = {

  update: async (id: string, type: number, unity: string, user: string, value: number, time: string) => {
    return await prisma.financial.update({
      where: { id },
      data: {
        type,
        unity: {
          connect: {
            id: unity
          }
        },
        user: {
          connect: {
            id: user
          }
        },
        value,
        updated_at: time
      }
    });
  },

}