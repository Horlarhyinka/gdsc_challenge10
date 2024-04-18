import * as storage from "./storage.js"
import { formatPrice } from "./factory.js"

const token = storage.getItem("token")
const symbol = "₦"

if(!token || !token.isAdmin)window.location.assign("/login")
const totalElem = document.querySelector("#total")
const outstandingElem = document.querySelector("#outstanding")
fetch("/api/v1/earnings", {headers:{
    "authorization": `Bearer ${token.accessToken}`,
    "Content-Type": "Application/json"
}})
.then(res=>res.json())
.then(res=>{
    const {earnings, total, outstanding} = res
    outstandingElem.innerHTML = symbol+formatPrice(outstanding)
    totalElem.innerHTML = symbol+formatPrice(total)
    
})
.catch(err=>{

})


const errorsElem = document.querySelector("#errors")



function showErrror(message="error occured"){
    const childElem = document.createElement("li")
    childElem.innerHTML = message
    errorsElem.appendChild(childElem)
    setTimeout(()=>{
        errorsElem.removeChild(childElem)
    }, 3500)
}

function handeleCreateEarning(obj){
    fetch("/api/v1/earnings", {method: "POST",headers:{
        "authorization": `Bearer ${token.accessToken}`,
        "Content-Type": "Application/json"
    }, body: JSON.stringify(obj)})
    .then(res=>res.json())
    .then(res=>{
        if(res.message){
            showErrror(res.message)
            return
        }
        window.location.reload()
    })
    .catch(err=>{
    const message = err.message || "error occured"
    showErrror(message)
    })
}

const obj = {

}

function listenAndUpdate(elem, name){
    elem.addEventListener("change", (e)=>{
        obj[name] = e.target.value
    })
}

listenAndUpdate(document.querySelector("#amount-input"), "amount")
listenAndUpdate(document.querySelector("#outstanding-input"), "outstanding")

const btn = document.querySelector("#submit")
btn.addEventListener("click", (e)=>{
    e.preventDefault()
    handeleCreateEarning(obj)
})
