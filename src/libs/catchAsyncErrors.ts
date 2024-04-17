import { Response, Request, NextFunction } from "express"
import catchMongooseErrors from "./catchMongooseErrors"


export default (fn: Function)=>{
    return async(req: Request, res: Response, next: NextFunction)=>{
        try{
            return await fn(req, res, next)
        }catch(err){
            
            const mongooseErr = catchMongooseErrors(err)
            if(mongooseErr)return res.status(400).json({ message: mongooseErr })
            return res.status(500).json({message: "internal server error"})
        }
    }
}