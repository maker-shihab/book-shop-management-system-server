import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/signup", UserController.createUser);
router.get("/profile/:id", UserController.getUserProfileData);

export const UserRoutes = router;
