import express from "express";
import { bookController } from "./books.controller";

const router = express.Router();

router.post("/create", bookController.createBook);

router.get("/", bookController.getAllBooks);
router.get("/:_id", bookController.getSingleBook);
router.get("/author/:authorId", bookController.getAllBooksByUser);

router.get("/condition/:condition", bookController.getBooksByContition);
router.get("/donation/all", bookController.getDonationBooks);
router.get("/featured/all", bookController.getFeaturedBoooks);

router.delete("/:id", bookController.deleteBook);

export const BookRoutes = router;
