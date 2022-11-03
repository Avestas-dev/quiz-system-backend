import express from "express";
import adminRouter from "./adminRouter";
import commonRouter from "./commonRouter";
import userRouter from "./userRouter";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// routes
router.use("/", commonRouter);
router.use("/", userRouter);
router.use("/admin", adminRouter);

export default router;
