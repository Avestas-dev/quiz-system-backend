import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";
import { login, processLogin } from "../controllers/commonController/login";
import { loginGoogle } from "../controllers/commonController/loginGoogle";
import { registerUser } from "../controllers/commonController/register";
import { registerGoogle } from "../controllers/commonController/registerGoogle";
import { resetPassword } from "../controllers/commonController/resetPassword";
import { resetPasswordStart } from "../controllers/commonController/resetPasswordStart";
import { refreshToken } from "../controllers/userController/refreshToken";
import { initializeDatabase } from "../helpers/databaseInitializer";
import { loginValidation } from "../middleware/validation/auth/loginValidation";
import { registerValidation } from "../middleware/validation/auth/registerValidation";
import { resetValidation } from "../middleware/validation/auth/resetValidation";

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
commonRouter.post("/reset", resetValidation, resetPassword);

commonRouter.post("/login-google", loginGoogle, processLogin);
commonRouter.post("/register-google", registerGoogle);

commonRouter.post("/initdb", initializeDatabase);

export default commonRouter;
