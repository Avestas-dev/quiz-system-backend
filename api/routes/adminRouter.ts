import express from "express";

// Middleware imports here

// Urlencoded
const adminRouter = express.Router();
adminRouter.use(express.json());
adminRouter.use(express.urlencoded({ extended: true }));

adminRouter.get("/", (req, res) => {
  // #swagger.security = [{"apiKeyAuth": []}]
  // #swagger.tags = ['Admin']
  res.status(200).send("Here i am as an admin ");
});

export default adminRouter;
