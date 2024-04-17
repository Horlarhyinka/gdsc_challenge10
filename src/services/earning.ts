import { Model } from "mongoose";
import EarningModel from "../models/earning.model";
import { EarningSchema } from "../models/types/earning";
import earningModel from "../models/earning.model";

class Earning{
    constructor(
        private earningSModel: Model<EarningSchema> = earningModel
    ){}

    createEarning(total: number, outstanding: number = 0){
        return this.earningSModel.create({total, outstanding})
    }

    async getEarnings(){
        const earnings = await this.earningSModel.find({})
        const obj = {
            earnings,
            total: earnings.reduce((prev, curr)=>prev+ curr.total,0),
            outstanding: earnings.reduce((prev, curr)=>prev+ curr.outstanding,0),
            available: earnings.reduce((prev, curr)=>prev+ (curr.total - curr.outstanding),0),
        }
    return obj
    }
}

const earningService = new Earning()

export default earningService