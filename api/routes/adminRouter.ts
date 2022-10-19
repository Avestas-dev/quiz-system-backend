import express from "express";

// Middleware imports here

// Urlencoded
const adminRouter = express.Router();
adminRouter.use(express.json());
adminRouter.use(express.urlencoded({ extended: true }));

export default adminRouter;
