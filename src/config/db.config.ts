import mongoose from "mongoose"
import config from "./config"


export const connectDB = () =>{
    return mongoose.connect(config.db.uri)
    .then(_=>{
        console.log("connected to db")
    })
    .catch(err=>{
        console.log("error connecting to db:",err)
    })
}