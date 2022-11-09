import express from "express";
import { acceptTag } from "../controllers/adminController/tags/acceptTag";
import { addTag } from "../controllers/adminController/tags/addTagAdmin";
import { editTag } from "../controllers/adminController/tags/editTag";
import { rejectTag } from "../controllers/adminController/tags/rejectTag";
import { getAllUsers } from "../controllers/adminController/user/getAllUsers";
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
adminRouter.post("/tag", addTagValidation, addTag);
adminRouter.put("/tag/accept", acceptTag);
adminRouter.put("/tag/reject", rejectTag);
adminRouter.put("/tag", addTagValidation, editTag);

// Users
adminRouter.get("/users", getAllUsers);

export default adminRouter;
