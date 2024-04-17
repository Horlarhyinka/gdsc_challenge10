import { Model } from "mongoose"
import TokenModel from "../models/token.model"
import { TokenSchema } from "../models/types/token"
import { createJWT } from "../utils/jwt"

class Token{
    constructor(
        private tokenModel: Model<TokenSchema> = TokenModel){
    }
    async createToken(jwt: string, isAdmin=false){
        if(jwt){
            const accessToken = jwt
            return this.tokenModel.create({accessToken, isAdmin})
        }
        return this.tokenModel.create()
    }

    deleteToken(accessToken: string){
        return this.tokenModel.findOneAndDelete({accessToken})
    }

    findToken(accessToken: string){
        return this.tokenModel.findOne({accessToken})
    }

    findByRefreshToken(refreshToken: string){
        return this.tokenModel.findOne({refreshToken})
    }

    getById(id: string){
        return this.tokenModel.findById(id)
    }
}


const tokenService = new Token()

export default tokenService