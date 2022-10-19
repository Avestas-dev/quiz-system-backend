// Common router for all other routers used in project

import express from "express";
import adminRouter from "./adminRouter";
import commonRouter from "./commonRouter";
import userRouter from "./userRouter";

// import multer from "multer";

// const upload = multer();

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// routes
router.use("/", commonRouter);
router.use("/", userRouter);
router.use("/admin", adminRouter);

//swagger

export default router;
