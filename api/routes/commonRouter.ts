import express from "express";

// Middleware imports here
// Urlencoded
const commonRouter = express.Router();

commonRouter.use(express.json());
commonRouter.use(express.urlencoded({ extended: true }));

commonRouter.get("/", (req, res) => {
  // #swagger.security = [{"apiKeyAuth": []}]
  // #swagger.tags = ['Common']
  res.status(200).send("Here i am at common");
});

export default commonRouter;
