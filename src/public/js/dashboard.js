import * as storage from "./storage"

const token = storage.getItem("token")
console.log({token})
if(!token){
    window.location.assign("/login")
}