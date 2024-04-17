import { Document } from "mongoose";

export interface EarningSchema implements Document{
    total: number
    outstanding: number
}