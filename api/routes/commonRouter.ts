import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";
import { login } from "../controllers/commonController/login";
import { loginGoogle } from "../controllers/commonController/loginGoogle";
import { registerUser } from "../controllers/commonController/register";
import { registerGoogle } from "../controllers/commonController/registerGoogle";
import { resetPasswordStart } from "../controllers/commonController/resetPasswordStart";
import { sendEmail } from "../controllers/commonController/sendEmail";
import { refreshToken } from "../controllers/userController/refreshToken";
import { loginValidation } from "../middleware/validation/loginValidation";
import { registerValidation } from "../middleware/validation/registerValidation";

// Middleware imports here
// Urlencoded
const commonRouter = express.Router();

commonRouter.use(express.json());
commonRouter.use(express.urlencoded({ extended: true }));

commonRouter.use("/api-docs", swaggerUi.serve /* #swagger.ignore = true */);
commonRouter.get(
  "/api-docs",
  swaggerUi.setup(swaggerDocument) /* #swagger.ignore = true */
);

// unauthorized routes
commonRouter.post("/login", loginValidation, login);
commonRouter.post("/register", registerValidation, registerUser);
commonRouter.get("/refresh", refreshToken);
commonRouter.post("/reset-start", resetPasswordStart);
commonRouter.get("/reset", resetPasswordStart);
commonRouter.post("/send-message", sendEmail);
commonRouter.post("/login-google", loginGoogle, login);
commonRouter.post("/register-google", registerGoogle);

export default commonRouter;
