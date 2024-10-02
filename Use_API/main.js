let inpt=document.querySelector("#amount");
let egy=document.querySelector(".result .egy span");
let sar=document.querySelector(".result .sar span");

// inpt.addEventListener("input",()=> {
//     let val =inpt.value;
//     egy.innerHTML=val*19;
//     sar.innerHTML=val*4;
// });

fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=89367b187cee4b4dbc953712f6354e94").then((res)=> {
    return res.json();
}).then ((res2)=> {
    let vals=res2.rates;
    inpt.addEventListener("input",()=> {
        let val=inpt.value;
        egy.innerHTML=Math.round(val*vals["EGP"]);
        sar.innerHTML=Math.round(val*vals["SAR"]);
        
    })
})