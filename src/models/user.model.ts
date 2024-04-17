import mongoose from "mongoose";
import { UserSchema } from "./types/user";
import bcrypt from "bcrypt"
import config from "../config/config";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema<UserSchema>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    isAdmin: { type: Boolean, required: true, default: false}
})

//compare password method
userSchema.methods.comparePassword = async function(plain: string){
    return bcrypt.compare(plain, this.password)
}

//generate token method
userSchema.methods.generateJWT = async function(){
    const id = this._id
    const isAdmin = this.isAdmin
    return jwt.sign({id, isAdmin}, config.server.secret, {expiresIn: "2d"})
}

//hash password before save and after update
userSchema.pre("save", async function(next){
    if(this.isNew || this.isModified("password") || this.directModifiedPaths().includes("password")){
      this.password = await hashPassword(this.password)
    }
    next()
  })
  
  userSchema.pre("findOneAndUpdate",async function(next){
    const updates = this.getUpdate() as {password?: string}
    if(updates["password"]){
      this.setUpdate({...updates, password: await hashPassword(updates["password"])})
    }
    next()
  })
  
  async function hashPassword(plain: string){
    const salt = await bcrypt.genSalt(12)
    const hashed = await bcrypt.hash(plain, salt);
    return hashed
  }

export default mongoose.model("user", userSchema)