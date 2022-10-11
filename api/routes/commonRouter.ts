import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";

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

export default commonRouter;
