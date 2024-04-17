import mongoose from "mongoose"
import { EarningSchema } from "./types/earning"

const earningSchema = new mongoose.Schema<EarningSchema>({
    total: {
        type: Number,
        required: true
    },
    outstanding: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

export default mongoose.model("earning", earningSchema)