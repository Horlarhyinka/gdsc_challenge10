import { Document } from "mongoose";

interface UserSchema extends Document{
    username: string
    password: string,
    generateJWT: ()=>Promise<string>,
    comparePassword: (string)=>Promise<boolean>
    isAdmin: boolean
}