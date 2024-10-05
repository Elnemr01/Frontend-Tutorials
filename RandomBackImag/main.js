let img=document.querySelectorAll(".images img");
let ele=document.querySelector(".test");

// make background color 

// let nums=[0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
// let color=[];

// for(let i=0;i<6;i++) {
//     color.push(nums[Math.floor(nums.length*Math.random())]);
// }
// let strColor=`#${color.join("")}`;
// ele.style.backgroundColor=strColor;


// make background image

let urls=[];
for(let i=0;i<img.length;i++) {
    urls.push(img[i].dataset.url);
}
let randomUrl=urls[Math.floor(Math.random()*urls.length)];
ele.textContent="";
ele.style.cssText=`
    background-image:url(${randomUrl});
    background-repeat: no-repeat;
    background-position: center`;