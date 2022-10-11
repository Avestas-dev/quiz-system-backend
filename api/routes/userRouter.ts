import express from "express";

// Middleware imports here

// Urlencoded
const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

userRouter.get("/", (req, res) => {
  // #swagger.security = [{"apiKeyAuth": []}]
  // #swagger.tags = ['User']
  res.status(200).send("Here i am as an router ");
});

export default userRouter;
