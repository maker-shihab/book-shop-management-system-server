import express from "express";
import { bookController } from "./books.controller";

const router = express.Router();

router.post("/create", bookController.createBook);
router.get("/new", bookController.getAllBooks);

export const BookRoutes = router;
