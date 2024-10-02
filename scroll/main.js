/*
    scrollTop === scrollY
    scrollHeight-> height of website + padding
    clientHeight -> height of visible part of website + padding
*/

let e=document.querySelector(".scroller");
let height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
let btn =document.querySelector(".btn");

// document.onscroll =function () {
//     // let scrollTop=window.scrollY;
//     let scrollTop= document.documentElement.scrollTop;
//     e.style.width=`${scrollTop/height *100}%`;
// }

document.addEventListener("scroll",()=> {
    let scroll_top= document.documentElement.scrollTop;
    e.style.width=`${scroll_top/height *100}%`;
    if(scroll_top > 0) {
        btn.style.display="block";
    }
    else {
        btn.style.display="none";
    }
});

btn.onclick=function () {
    window.scrollTo({
        left:0,
        top:0,
        behavior:"smooth"
    });
}


