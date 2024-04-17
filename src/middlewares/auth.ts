import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken"
import config from "../config/config";
import userService from "../services/user";
import { UserSchema } from "../models/types/user";
import tokenService from "../services/token";

interface ExtReq extends Request{
    user: UserSchema
}

const useAuth = async function(req: Request, res: Response, next: NextFunction){
    function sendUnauthenticated(msg?: string){
        return res.status(401).json({message: msg || "unauthenticated"})
    }
    const authPayload = req.headers["authorization"]
    if(!authPayload)return sendUnauthenticated()
    const [prefix, token] = authPayload.split(" ")
    if(prefix?.toLowerCase() !== "bearer" || !token)return sendUnauthenticated("bearer token is required")
    const target = await tokenService.findToken(token)
    if(!target)return sendUnauthenticated("invalid access token")
    if(target.isExpired())return sendUnauthenticated("token expired.")
    next()
}

export default useAuth