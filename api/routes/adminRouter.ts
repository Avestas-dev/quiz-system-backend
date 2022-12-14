import express from "express";
import { acceptTag } from "../controllers/adminController/tags/acceptTag";
import { addTag } from "../controllers/adminController/tags/addTagAdmin";
import { editTag } from "../controllers/adminController/tags/editTag";
import { rejectTag } from "../controllers/adminController/tags/rejectTag";
import { blockUser } from "../controllers/adminController/user/blockUser";
import { getAllUsers } from "../controllers/adminController/user/getAllUsers";
import { unlockUser } from "../controllers/adminController/user/unlockUser";
import { getAllTagsAdmin } from "../controllers/userController/tags/getAllTagsAdmin";
import { checkBlockedUser } from "../middleware/checkBlockedUser";
import { addTagValidation } from "../middleware/validation/tags/addTagValidation";
import { verifyAdmin } from "../middleware/verifyAdmin";
import { verifyToken } from "../middleware/verifyToken";

// Middleware imports here

// Urlencoded
const adminRouter = express.Router();
adminRouter.use(express.json());
adminRouter.use(express.urlencoded({ extended: true }));

adminRouter.use(verifyToken, verifyAdmin, checkBlockedUser);

// Tags
adminRouter.get("/tag", getAllTagsAdmin);
adminRouter.post("/tag", addTagValidation, addTag);
adminRouter.put("/tag/accept", acceptTag);
adminRouter.put("/tag/reject", rejectTag);
adminRouter.put("/tag", addTagValidation, editTag);

// Users
adminRouter.get("/user/all", getAllUsers);
adminRouter.post("/user/block", blockUser);
adminRouter.post("/user/unlock", unlockUser);

export default adminRouter;
