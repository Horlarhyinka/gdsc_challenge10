export function formatPrice(price){
    if(price === undefined)return "0"
    price = price.toString()
    let res= ""
    let cont = 0
    for(let i = price.length-1;i>=0;i--){
        res = price[i]+res
        cont++
        if(cont === 3 && price[i-1]){
            cont = 0
            res = ","+res
        }
    }
    return res
}