import { Request, Response } from "express";
import catchAsyncErrors from "../libs/catchAsyncErrors";
import validator from "../services/validator";
import bookService from "../services/book"

const filters = ["author", "title", "yearofpublish", "category"]

export const createBook = catchAsyncErrors(async(req: Request, res: Response)=>{
    const validateRes = validator.validateCreateBookPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const book = await bookService.createBook({...req.body})
    return res.status(201).json(book)
})

export const getBooks = catchAsyncErrors(async(req: Request, res: Response)=>{
    const validateRes = validator.validateGetBooksQuery(req.query)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    let {filter, value, page, count} = req.query
    filter = filter?.toString()
    let books = []
    if(filters.includes((filter as string)?.toLowerCase()) && value ){
        books = await bookService.findByAuthorName(value?.toString(), parseInt(page as string), parseInt(count as string))
    }else{
        books = await bookService.getAll(parseInt(page as string), parseInt(count as string))
    }
    return res.status(200).json(books)
})

export const getBook = catchAsyncErrors(async(req: Request, res: Response)=>{
    const { id } = req.params
    const book = await bookService.getById(id)
    if(!book)return res.status(404).json({message: "book not found"})
    return res.status(200).json(book)
})

export const updateBook = catchAsyncErrors(async(req: Request, res: Response)=>{
    const {id} = req.params
    const validateRes = validator.validateUpdateBookQuery(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const updated = await bookService.updateBook(id, req.body)
if(!updated)return res.status(200).json({message: "book not found."})
    return res.status(200).json(updated)
})

export const deleteBook = catchAsyncErrors(async(req: Request, res: Response)=>{
    const {id} = req.params
    const deleted = await bookService.deleteBook(id)
    return res.status(204).json(deleted)
})