import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  RegisterRequestModel,
  RegisterResponseModel,
} from "../../models/registerModel";
const prisma = new PrismaClient();

export const registerUser = async (
  req: RegisterRequestModel,
  res: RegisterResponseModel
) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint to register user'

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'User login.',
            required: true,
            schema: { $ref: "#/definitions/Register" }
    } */

  const { email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: encryptedPassword,
    },
  });

  return res.json(user);
};
