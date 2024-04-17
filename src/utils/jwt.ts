import config from "../config/config"
import jwt from "jsonwebtoken"

export async function createJWT(id: string){
    return jwt.sign({id}, config.server.secret, {expiresIn: "2d"})
}