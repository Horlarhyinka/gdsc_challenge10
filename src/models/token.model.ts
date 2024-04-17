import mongoose from "mongoose"
import { TokenSchema } from "./types/token"
import config from "../config/config"
import { generateRandom } from "../utils/token"

const tokenSchema = new mongoose.Schema<TokenSchema>({
    accessToken: { type: String, required: true, default: generateRandom()},
    refreshToken: { type: String, required: true, default: generateRandom()},
    expireAt: {type: Number, required: true, default: Date.now() + config.server.tokenLifespan},
    isAdmin: { type: Boolean, required: true, default: false}
})

tokenSchema.methods.isExpired = function(){
    return Date.now() >= this.expireAt
}

tokenSchema.methods.refresh = async function(){
    this.expireAt += config.server.tokenLifespan
    return this.save()
}

export default mongoose.model("token", tokenSchema)