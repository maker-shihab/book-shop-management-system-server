import express from "express";
import { bookController } from "./books.controller";

const router = express.Router();

router.post("/create", bookController.createBook);

router.get("/", bookController.getAllBooks);
router.get("/condition/:condition", bookController.getBooksByContition);
router.get("/donation", bookController.getDonationBooks);
router.get("/featured", bookController.getFeaturedBoooks);

export const BookRoutes = router;
