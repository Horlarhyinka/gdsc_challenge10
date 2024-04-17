import crypto from "crypto"

export const generateRandom = ()=>{
    return crypto.randomBytes(102).toString("hex")


}