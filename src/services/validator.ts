import joi from "joi"
import { Categories } from "../models/book.model"

class Validator{
    validateCreateBookPayload(obj: object){
        return joi.object({
            title: joi.string().required(),
            author: joi.string().required(),
            yearOfPublish: joi.number().max((new Date()).getFullYear()).required(),
            category: joi.string().required().messages({"any.required":`invalid category. Category must be ${Categories.join(", ")}`}),
            quantityInStock: joi.number().required().min(0)
        }).validate(obj)
    }

    validateGetBooksQuery(obj: object){
        return joi.object({
            title: joi.string(),
            author: joi.string(),
            yearOfPublish: joi.number(),
            category: joi.string(),
        }).validate(obj)
    }

    validateUpdateBookQuery(obj: object){
        return joi.object({
            title: joi.string(),
            author: joi.string(),
            yearOfPublish: joi.number().max((new Date()).getFullYear()),
            category: joi.string().messages({"any.base":`invalid category. Category must be ${Categories.join(", ")}`}),
            quantityInStock: joi.number().min(0)
        }).validate(obj)
    }

    validateCreateUserPayload(obj: object){
        return joi.object({
            username: joi.string().required().min(3),
            password: joi.string().required().min(6)
        }).validate(obj)
    }

    validateCreateEarningPayload(obj: object){
        return joi.object({
            amount: joi.number().required().min(0),
            outstanding: joi.number().min(0)
        }).validate(obj)
    }
}

const validator = new Validator()

export default Object.freeze(validator)