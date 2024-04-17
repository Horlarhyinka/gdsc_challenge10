import { Request, Response } from "express";
import catchAsyncErrors from "../libs/catchAsyncErrors";
import validator from "../services/validator";
import earningService from "../services/earning";

export const createEarning = catchAsyncErrors(async(req: Request, res: Response)=>{
    const validateRes = validator.validateCreateEarningPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const earning = await earningService.createEarning(req.body.amount, req.body.outstanding)
    return res.status(201).json(earning)
})

export const getEarnings = catchAsyncErrors(async(req: Request, res: Response)=>{
    const earningsObj = await earningService.getEarnings()
    return res.status(200).json(earningsObj)
})