import { prisma } from "../../../database/prismaClient";
import { UpdateCarrier } from "../../../types/Carrier";

type UpdateCarrierParams = {
  id: string;
  data: UpdateCarrier;
  time: string
}

export const updateCarrierService = {

  update: async ({ id, data, time }: UpdateCarrierParams) => {
    return await prisma.carrier.update({
      where: { id },
      data: {
        ...data,
        updated_at: time
      }
    });
  },

}
