let nums=document.querySelectorAll(".nums .num");
let section =document.querySelector("section:nth-child(3)");
let vst=false;


window.addEventListener("scroll",()=> {
    if(section.offsetTop<=document.documentElement.scrollTop) {
        if(!vst) {
            nums.forEach((num)=> startCount(num));
            vst=true;
        }
    }
})


function startCount (el) {
    let goal=el.dataset.goal;
    let count =setInterval(()=> {
        el.textContent++;
        if(el.textContent===goal) {
            clearInterval(count);
        }
    },2000/goal)
}