import { Request, Response } from "express";
import catchAsyncErrors from "../libs/catchAsyncErrors";
import validator from "../services/validator";
import userService from "../services/user";
import { mailRegex } from "../libs/regex";
import tokenService from "../services/token";
import mongoose from "mongoose";
import { createJWT } from "../utils/jwt";


export const register = catchAsyncErrors(async(req: Request, res: Response)=>{

    const validateRes = validator.validateCreateUserPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const existing = await userService.findOne({username: req.body.username})
    if(existing)return res.status(400).json({message: "username is taken"})
    const user = await userService.create({...req.body})
    const token = await tokenService.createToken(user._id.toString())
    return res.status(201).json({user:{...user.toObject(), password: undefined}, token})
})

export const registerAdmin = catchAsyncErrors(async(req: Request, res: Response)=>{

    const validateRes = validator.validateCreateUserPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const existing = await userService.findOne({username: req.body.username})
    if(existing)return res.status(400).json({message: "username is taken"})
    const user = await userService.create({...req.body, isAdmin: true})
    const token = await tokenService.createToken(user._id.toString(), user.isAdmin)
    return res.status(201).json({user:{...user.toObject(), password: undefined}, token})
})



export const login = catchAsyncErrors(async(req: Request, res: Response)=>{
    const { username, password} = req.body
    if(!username || !password) return res.status(400).json({message: "username and password is required."})
    const user = await userService.findOne({username})
    if(!user)return res.status(404).json({message: "user not found."})
    const passwordCorrect = await user.comparePassword(password)
    if(!passwordCorrect)return res.status(400).json({message: "incorrect passsword"})
    const jwt = await createJWT(user._id.toString())
    const token = await tokenService.createToken(jwt, user.isAdmin)
    return res.status(200).json({user: {...user.toObject(), password: undefined}, token})
})

export const getAccessToken = catchAsyncErrors(async(req: Request, res: Response)=>{
    const id = (new mongoose.Types.ObjectId()).toString()
    const jwt = await createJWT(id)
    const token = tokenService.createToken(jwt)
    return res.status(201).json(token)
})

export const refreshToken = catchAsyncErrors(async(req: Request, res: Response)=>{
    const { refreshToken} = req.query
    if(!refreshToken)return res.status(400).json({message: "reresh token is required."})
    const token = await tokenService.findByRefreshToken(refreshToken.toString())
    if(!token)return res.status(404).json({message: "token not found"})
    return res.status(200).json(await token.refresh())
})