// setting game name
let gameName="Guess The Word";
document.title=gameName;
document.querySelector("h1").innerHTML=gameName;
// ------------footer---------------
let footer=document.querySelector("footer");
footer.innerHTML=`${gameName} Game is created by Elnemr.`;
footer.style.cssText=`
text-align: center;
padding: 20px;
background-color: white;
font-size: 20px;
text-transform: capitalize;
background-color: #333;
color: white;`

// -----------create the array of words and choice one randomly-----------
let words=["create","update","delete","master","branch","elnemr","elzero","school","ahmoud"];
let gusseWord=words[Math.floor(Math.random()*words.length)].toUpperCase();
let message=document.querySelector(".message");

// -----------setting of inputs-----------

let numOfTries=7;
let numOfLetters=gusseWord.length;
let currentTry=1;

function generateInputs () {
    let divinputs=document.querySelector(".inputs");
    // -----------------------------------------------------------
    for(let i=1;i<=numOfTries;i++) {
        let tryDiv=document.createElement("div");

        tryDiv.className=`try-${i}`;
        tryDiv.innerHTML=`<span>Try ${i}</span>`;
        if(i!==1) tryDiv.classList.add("disabled");
        // create inputs in on try div
        for(let j=1;j<=numOfLetters;j++) {
            let input=document.createElement("input");
            input.id=`try-${i}-letter-${j}`;
            input.maxLength=1;
            tryDiv.appendChild(input);
        }
        // focus on the first input
        divinputs.appendChild(tryDiv);
    }
    // -----------------------------------------------------------

    // after generate the inputs 
    divinputs.children[0].children[1].focus();
    // disable the inputs
    let disabledInputs =document.querySelectorAll(".disabled input");
    disabledInputs.forEach((ele)=> {
        ele.disabled=true;
    });
    // -----------------------------------------------------------

    // focus on the next input after type in the previos input
    let inputs =document.querySelectorAll("input");
    inputs.forEach((e,i)=> {
        // on input 
        e.addEventListener("input",()=> {
            e.value=e.value.toUpperCase();
            let nextele=inputs[i+1];
            if(i<inputs.length && e.value.length!==0) nextele.focus();
        })
    
        // on key down
        e.addEventListener("keydown",(eve)=> {
            let index=Array.from(inputs).indexOf(eve.target);
            let next=inputs[index+1];
            let previous=inputs[index-1];
            if(eve.key==="ArrowRight") {
                if(index<inputs.length && e.value.length!==0) next.focus();
            }
            if(eve.key==="ArrowLeft") {
                if(index>=0) previous.focus();
            }
        })
    })
}
// ----------------------------------check button -------------------------------
let checkBtn=document.querySelector(".check");
let hintBtn=document.querySelector(".hint");

checkBtn.addEventListener("click",handleGuesses);
console.log(gusseWord);
function handleGuesses () {
    let sucess=true;
    for(let i=1;i<=numOfLetters;i++) {
        let currInput=document.querySelector(`#try-${currentTry}-letter-${i}`);
        if(currInput.value===gusseWord[i-1]) {
            currInput.classList.add("inplace");
        }
        else if (gusseWord.includes(currInput.value) && currInput.value.length!==0) {
            currInput.classList.add("wrongplace");
            sucess=false;
        }
        else {
            currInput.classList.add("noplace");
            sucess=false;
        }
    }
    // manage sucess --------------------------------------------
    let divs=document.querySelectorAll(".inputs > div");
    if(sucess) {
        message.innerHTML=`<p>congratulation!</p>you <span>win</span> and the word is <span>${gusseWord}</span>`;
        message.style.cssText=`width: fit-content; height:fit-content; display: block;`;
        divs[currentTry-1].classList.add("disabled");
        //width: 398px; height:114px; display: block;
        for(let i=1;i<=numOfLetters;i++) {
            divs[currentTry-1].children[i].disabled=true;
        }
        checkBtn.classList.add("disabled");
        hintBtn.classList.add("disabled");
    }
    else if (currentTry===6) {
        divs[currentTry-1].classList.add("disabled");
        for(let i=1;i<=numOfLetters;i++) {
            divs[currentTry-1].children[i].disabled=true;
        }
        message.innerHTML=`<p>good luck next time</p>you <span>lose</span> and the correct word is <span>${gusseWord}</span>`;
        message.style.cssText=`width:fit-content; height:fit-content; display: block;`;
        let span=document.querySelectorAll(".message > span");
        let p=document.querySelector(".message > p");
        span[0].style.color="#27303f";
        span[1].style.color="#27303f";
        p.style.color="black";
        checkBtn.classList.add("disabled");
        hintBtn.classList.add("disabled");
    }
    else {
        currentTry++;

        divs[currentTry-2].classList.add("disabled");
        for(let i=1;i<=numOfLetters;i++) {
            divs[currentTry-2].children[i].disabled=true;
        }

        divs[currentTry-1].classList.remove("disabled");
        for(let i=1;i<=numOfLetters;i++) {
            divs[currentTry-1].children[i].disabled=false;
        }

        divs[currentTry-1].children[1].focus();
    }
}

// ----------------------------------hint button -------------------------------
let numsHint=2;
let hintSpan=document.querySelector(".hint span");

hintSpan.innerHTML=numsHint;

hintBtn.addEventListener("click",manageHint);

function manageHint () {

    // decrease the nums of hints
    if(numsHint>0) {
        numsHint--;
        hintSpan.innerHTML=numsHint;
        if(numsHint===0) hintBtn.classList.add("disabled");
    }

    let enabledInputs=document.querySelectorAll("input:not([disabled])");
    let emptyInputs=Array.from(enabledInputs).filter((e)=> e.value==="");
    if(emptyInputs.length > 0) {
        let randomInput=emptyInputs[Math.floor(Math.random()*emptyInputs.length)];
        let indexToFill=Array.from(enabledInputs).indexOf(randomInput);
        randomInput.value=gusseWord[indexToFill];
    }
    else {
    }
}

function handleBackSpace (event) {
    if(event.key==="Backspace") {
        let inputs=document.querySelectorAll("input:not([disabled])");
        let currIndex=Array.from(inputs).indexOf(document.activeElement);
        console.log(currIndex);
        if(currIndex===0) {
            inputs[currIndex].value="";
        }
        else {
            inputs[currIndex].value="";
            inputs[currIndex-1].focus();
        }
    }
}
document.addEventListener("keydown", handleBackSpace);

window.onload= () => {
    generateInputs();
}


