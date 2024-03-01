import express from "express";
import { createSeller } from "./user.controller";

const router = express.Router();

router.post("/seller", createSeller);

export const UserRoutes = router;
