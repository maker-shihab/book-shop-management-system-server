import express from "express";
import { createUser, getUserById } from "./user.controller";

const router = express.Router();

router.post("/create", createUser);
router.get("/:id", getUserById);

export const UserRoutes = router;
