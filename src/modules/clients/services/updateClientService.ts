import { prisma } from "../../../database/prismaClient";

export const updateClientService = {

  update: async (id: string, name: string, email: string, tel: string, cep: string, city: string, state: string, unity: string, user: string, time: string) => {
    return await prisma.client.update({
      where: { id },
      data: {
        name,
        email,
        tel,
        cep,
        city,
        state,
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
        updated_at: time
      }
    });
  },

}