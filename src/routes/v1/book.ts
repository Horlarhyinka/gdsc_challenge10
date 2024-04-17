import { Router } from "express";
import { createBook, deleteBook, getBook, getBooks, updateBook } from "../../controllers/book";
import validateIdParam from "../../middlewares/validateIdParam";
import useAuth from "../../middlewares/auth";

const router = Router()

router.post("/", useAuth, createBook)
router.get("/", useAuth, getBooks)
router.put("/:id", validateIdParam, useAuth, updateBook)
router.get("/:id", validateIdParam, useAuth, getBook)
router.delete("/:id", validateIdParam, useAuth, deleteBook)

export default router