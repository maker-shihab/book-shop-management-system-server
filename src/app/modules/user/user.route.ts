import express from "express";
import {
  createAdmin,
  createCustomar,
  createDonar,
  createSeller,
} from "./user.controller";

const router = express.Router();

router.post("/admin", createAdmin);
router.post("/customar", createCustomar);
router.post("/seller", createSeller);
router.post("/donar", createDonar);

export const UserRoutes = router;
