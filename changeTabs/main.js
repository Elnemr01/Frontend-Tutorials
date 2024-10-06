let lis=document.querySelectorAll("li");
let p=document.querySelectorAll("section > p");
console.log(p);

lis.forEach((li)=> {
    li.addEventListener("click",(event)=> {
        lis.forEach((e)=> {
            e.classList.remove("active");
        })

        p.forEach((e)=> {
            e.classList.remove("active");
        })
        let cls=event.target.className;
        event.target.classList.add("active");
        p.forEach((e)=> {
            if(e.className===cls) {
                e.classList.add("active");
            }
        })
    })
})