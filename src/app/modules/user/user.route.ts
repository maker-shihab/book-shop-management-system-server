import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/admin", UserController.createAdmin);
router.post("/customar", UserController.createCustomar);
router.post("/seller", UserController.createSeller);
router.post("/donar", UserController.createDonar);
router.get("/profile/:id", UserController.getUserProfileData);

export const UserRoutes = router;
