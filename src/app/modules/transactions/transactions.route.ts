import express from "express";
import { transactionsController } from "./transactions.controller";

const router = express.Router();

router.post("/add", transactionsController.addToCart);

export const TransactionsRoute = router;
