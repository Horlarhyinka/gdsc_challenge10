import { Model } from "mongoose";
import UserModel from "../models/user.model";
import { UserSchema } from "../models/types/user";

class User{
    constructor(private userModel: Model<UserSchema> = UserModel){
    }
    create(obj: {email: string, password: string, isAdmin?: boolean}){
        return this.userModel.create(obj)
    }

    findOne(obj: {username: string}){
        return this.userModel.findOne(obj)
    }

    getById(id: string){
        return this.userModel.findById(id)
    }

    getAll(){
        return this.userModel.find()
    }

    delete(id: string){
        return this.userModel.findByIdAndDelete(id)
    }

    update(id: string, obj: object){
        return this.userModel.findByIdAndUpdate(id, obj, {new: true})
    }
}

const userService = new User()

export default userService