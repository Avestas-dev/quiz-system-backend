import express from "express";
import { acceptTag } from "../controllers/adminController/tags/acceptTag";
import { addTag } from "../controllers/adminController/tags/addTagAdmin";
import { rejectTag } from "../controllers/adminController/tags/rejectTag";
import { addTagValidation } from "../middleware/validation/tags/addTagValidation";
import { verifyAdmin } from "../middleware/verifyAdmin";
import { verifyToken } from "../middleware/verifyToken";

// Middleware imports here

// Urlencoded
const adminRouter = express.Router();
adminRouter.use(express.json());
adminRouter.use(express.urlencoded({ extended: true }));

adminRouter.use(verifyToken, verifyAdmin);

// Tags
adminRouter.post("/admin/tag", addTagValidation, addTag);
adminRouter.post("/admin/tag/accept", acceptTag);
adminRouter.post("/admin/tag/reject", rejectTag);

export default adminRouter;
