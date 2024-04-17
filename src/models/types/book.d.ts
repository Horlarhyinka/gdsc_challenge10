import { Document } from "mongoose";

export interface BookSchema extends Document{
    title: string
    yearOfPublish: number
    author: string
    category: string
    quantityInStock: number
    available: boolean
}