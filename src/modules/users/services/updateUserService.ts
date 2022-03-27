import { prisma } from "../../../database/prismaClient";
import { UpdateUser } from "../../../types/User";

type UpdateUserParams = {
  id: string;
  data: UpdateUser;
  time: string
}

export const updateUserService = {

  update: async ({ id, data, time }: UpdateUserParams) => {
    return await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updated_at: time
      }
    });
  },

}
