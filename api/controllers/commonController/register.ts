import bcrypt from "bcrypt";
import { prisma } from "../../helpers/prisma";
import {
  RegisterRequestModel,
  RegisterResponseModel,
} from "../../models/registerModel";

export const registerUser = async (
  req: RegisterRequestModel,
  res: RegisterResponseModel
) => {
  /*
      #swagger.tags = ['Auth']
      #swagger.description = 'Endpoint to register user'
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'User login.',
        required: true,
        schema: { $ref: "#/definitions/RegisterRequest" }
      } 
      #swagger.responses[200] = {
        description: 'User successfully signed up.',
        schema: { $ref: '#/definitions/RegisterResponse' 
      }
   */

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
