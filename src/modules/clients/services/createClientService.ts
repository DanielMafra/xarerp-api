import { prisma } from "../../../database/prismaClient";

import { Client } from "../../../types/Client";

export const createClientService = {

  create: async (data: Client) => {
    return await prisma.client.create({
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        tel: data.tel,
        cep: data.cep,
        city: data.city,
        state: data.state,
        unity: {
          connect: {
            id: data.unity
          }
        },
        user: {
          connect: {
            id: data.user
          }
        }
      }
    });
  },

}