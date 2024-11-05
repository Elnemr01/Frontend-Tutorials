let input=document.querySelector("input");
let lis=document.querySelectorAll("li:not(:last-child)");
let timer =document.querySelector(".timer");
let duration=0;
let timer_fun;



input.addEventListener("input",()=> {
    let val=input.value;
    duration=parseInt(val)*60;
    clearInterval(timer_fun)
    timmmmmmer(duration);
})

lis.forEach((li)=> {
    li.addEventListener("click",startNewTime);
})


function startNewTime (event) {
    duration= +event.target.dataset.duration;
    clearInterval(timer_fun);
    timmmmmmer(duration);
    
}

function timmmmmmer (duration) {
    timer_fun=setInterval(()=> {
        let min=parseInt(duration/60);
        let sec=parseInt(duration%60);
        let hours=0;

        if(min>=60) {
            hours=parseInt(min/60); 
            min=parseInt(min%60);
        }
        

        if(hours < 10) hours=`0${hours}`;
        if(min < 10) min=`0${min}`;
        if(sec < 10) sec=`0${sec}`;

        timer.innerHTML=`${hours}:${min}:${sec}`;

        if(--duration < 0) {
            clearInterval(timer_fun);
        }
    },1000);
}