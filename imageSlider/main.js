
// variabls
let numImages=6;
let currImage=1;
let numDiv = document.querySelector(".image-num");
let indecator=document.querySelector(".indecator");
let indecator_li=document.querySelectorAll("li");
let prev=document.querySelector(".prev");
let next=document.querySelector(".next");
let images=document.querySelectorAll("img");

// main code

for(let i=0;i<numImages;i++) {
    indecator_li[i].addEventListener("click",activate);
    indecator_li[i].addEventListener("click",handle_num);
}

prev.addEventListener("click",handlePrevious);
next.addEventListener("click",handleNext);


// functions

function activate(event) {
    for(let i=0;i<numImages;i++) {
        indecator_li[i].classList.remove("active");
    }
    event.target.classList.add("active");
    // go to the active image
    let activeImage=document.querySelector(".slider img.active");
    activeImage.classList.remove("active");
    let index= +event.target.textContent;
    // avtivate the selected one
    let image=images[index-1];
    image.classList.add("active");
}

function handle_num(event) {
    let li=event.target.innerHTML;
    numDiv.innerHTML=`silde #${li}`;
    currImage= +li;
}


function handlePrevious () {
    if(currImage>1) {
        currImage--;
        // go to previous image 
        let activeImage=document.querySelector(".slider img.active");
        activeImage.classList.remove("active");
        activeImage.previousElementSibling.classList.add("active");
        // go to  previous li 
        let activeli=document.querySelector(".indecator li.active");
        activeli.classList.remove("active");
        activeli.previousElementSibling.classList.add("active");
        // update num of slide
        numDiv.innerHTML=`silde #${currImage}`;
    }
}

function handleNext () {
    if(currImage<6) {
        currImage++;
        // go to next image 
        let activeImage=document.querySelector(".slider img.active");
        activeImage.classList.remove("active");
        activeImage.nextElementSibling.classList.add("active");
        // go to  next li 
        let activeli=document.querySelector(".indecator li.active");
        activeli.classList.remove("active");
        activeli.nextElementSibling.classList.add("active");
        // update num of slide
        numDiv.innerHTML=`silde #${currImage}`;
    }
}