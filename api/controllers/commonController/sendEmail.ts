import { sendResetPasswordEmail } from "../../helpers/sendResetPasswordEmail";
export const sendEmail = (req: any, res: any) => {
  sendResetPasswordEmail({ email: "test@hotmail.com" });
  return res.json({ status: "success" });
};
