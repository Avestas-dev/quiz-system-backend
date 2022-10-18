import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";
import { login } from "../controllers/commonController/login";
import { registerUser } from "../controllers/commonController/register";
import { loginValidation } from "../middleware/validation/loginValidation";
import { registerValidation } from "../middleware/validation/registerValidation";

// Middleware imports here
// Urlencoded
const commonRouter = express.Router();

commonRouter.use(express.json());
commonRouter.use(express.urlencoded({ extended: true }));

commonRouter.use("/api-docs", swaggerUi.serve);
commonRouter.get("/api-docs", swaggerUi.setup(swaggerDocument));

commonRouter.get("/", (req, res) => {
  // #swagger.security = [{"apiKeyAuth": []}]
  // #swagger.tags = ['Common']
  res.status(200).send("Here i am at common");
});

commonRouter.post("/login", loginValidation, login);
commonRouter.post("/register", registerValidation, registerUser);

export default commonRouter;
