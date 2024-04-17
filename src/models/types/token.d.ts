import { Document } from "mongoose";

export interface TokenSchema implements Document{
    accessToken: string
    refreshToken: string
    expireAt: number
    isExpired: ()=>boolean
    refresh: ()=>Promise<TokenSchema>
    isAdmin: boolean
}