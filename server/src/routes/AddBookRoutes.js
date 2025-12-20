import express from "express";
import {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
} from "../controller/AddBookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, addBook)
  .get(protect, getBooks);

router.route("/:id")
  .put(protect, updateBook)
  .delete(protect, deleteBook);

export default router;
