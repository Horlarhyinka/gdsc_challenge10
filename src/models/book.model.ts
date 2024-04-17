import mongoose from "mongoose"
import { BookSchema } from "./types/book"

export const Categories = ["Technology", "Finance", "Cooking", "Sport", "Self-development", "Politics", "Other"]

const bookSchema = new mongoose.Schema<BookSchema>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    yearOfPublish: { type: Number, required: true },
    category: { type: String, required: true, enum: [...Categories]},
    quantityInStock: {type: Number, required: true},
    available: { type: Boolean, required: true, default: true}
})

export default mongoose.model("Book", bookSchema)