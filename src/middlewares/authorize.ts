import { NextFunction, Request, Response } from "express";
import tokenService from "../services/token";

export const adminOnly = async(req: Request, res: Response, next: NextFunction)=>{
    const [_, accessToken] = req.headers["authorization"]!.split(" ")
    const token = await tokenService.findToken(accessToken)
    if(!token?.isAdmin)return res.status(403).json({message: "you are not authorized for this action"})
    next()
}