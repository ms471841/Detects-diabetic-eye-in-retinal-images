import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
  UploadImage,
} from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//User Routes
router.route("/register").post(createUser);
router.route("/loginuser").post(loginUser);
router.route("/logoutuser").get(logoutUser);
router.route("/getuserprofile").get(isAuthenticated, getProfile);
router.route("/user/updateprofile/:id").put(isAuthenticated, updateProfile);
router.route("/uploadimage/:id").put(singleUpload, UploadImage);


export default router;
