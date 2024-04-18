import * as storage from "./storage.js"

function loginReguest(obj){
    return axios.post("/api/v1/auth/login", obj)
}


const usernameElem = document.querySelector("#username-input")
const passwordElem = document.querySelector("#password-input")
const errorsElem = document.querySelector("#errors")
const submitElem = document.querySelector("#submit")

submitElem.addEventListener("click", handleLogin)

async function handleLogin(e){
    e.preventDefault()
    const username = usernameElem.value
    const password = passwordElem.value
    if(!username || !username.length  || !password || !password.length)return
    fetch("/api/v1/auth/login", {method: "POST", headers: {"Content-Type": "Application/json"}, body: JSON.stringify({username, password})})
    .then(res=>{
        return res.json()
    })
    .then(res=>{
        if(res.message && !res.user){
            showErrror(res.message)
            return
        }
        const {user, token} = res
        storage.setItem("user", user)
        storage.setItem("token", token)
        return window.location.assign("/earnings")
    })
    .catch(err=>{
        const message = err.message || "authentication failed"
        showErrror(message)
    })

}

function showErrror(message="error occured"){
    const childElem = document.createElement("li")
    childElem.innerHTML = message
    errorsElem.appendChild(childElem)
    setTimeout(()=>{
        errorsElem.removeChild(childElem)
    }, 3500)
}
