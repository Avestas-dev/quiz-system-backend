import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";
import { login } from "../controllers/commonController/login";
import { registerUser } from "../controllers/commonController/register";
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
// unauthorized routes
commonRouter.post("/refresh", refreshToken);

export default commonRouter;
