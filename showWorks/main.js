let lis=document.querySelectorAll("li");
let imgs=document.images;

lis.forEach((e)=> {
    // e.addEventListener("click",(event)=> {
    //     lis.forEach((e)=> {
    //         if(e.classList.contains("active")) {
    //             e.classList.remove("active")
    //         }
    //     });
    //     event.target.classList.add("active");
    // })
    e.addEventListener("click",removeActive);
    e.addEventListener("click",sellectOwnWorks);
})


// remove Active class

function removeActive () {
    lis.forEach((e)=> {
        e.classList.remove("active");
        this.classList.add("active");
    })
}

// sellect Own Works

function sellectOwnWorks() {
    for(let i=0;i<imgs.length;i++) {
        imgs[i].style.display="none";
    }

    let ele=document.querySelectorAll(this.dataset.cat);
    ele.forEach((img)=> {
        img.style.display="block";
    })

}