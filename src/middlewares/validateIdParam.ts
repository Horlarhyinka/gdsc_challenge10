import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export default (req: Request, res: Response, next: NextFunction)=>{
    for(let key of Object.keys(req.params)){
        if(key.toLowerCase().endsWith("id")){
            if(!mongoose.Types.ObjectId.isValid(req.params[key]))return res.status(400).json({message: `invalid ${key}`})
        }
    }
    next()
}