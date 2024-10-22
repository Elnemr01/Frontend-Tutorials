
let Qarea=document.querySelector(".Q-area");
let next=document.querySelector(".next");
let previous=document.querySelector(".previous");
let end=document.querySelector(".end");
let result=document.querySelector(".result");
let message=document.querySelector(".message");
let control=document.querySelector(".control");
let timer=document.querySelector(".timer");
let myApplication=document.querySelector(".application");

let currentQ=1;
let len=0;
let countTimer;
let correctAnswers=[];
let duration=10*60;
// --------------------------------------------------
// create Questions
window.onload=function () {
    fetch("../QuizApp/questions.json").then((res)=> res.json())
    .then((objs)=> {
        let indx=1;
        len=Object.keys(objs).length;
        objs.forEach((ele) => {
            // get the correct answer
            correctAnswers.push(ele.answer5);
            // create header and Q content
            let qDiv=document.createElement("div");
            qDiv.className="question";
            if(indx===1) {
                qDiv.classList.add("Q-active");
            }
            let header=document.createElement("h2");
            header.innerHTML=`Question-${indx}`;
            qDiv.appendChild(header);
            let qContent=document.createElement("p");
            qContent.innerHTML=ele.question;
            qDiv.appendChild(qContent);

            // create choice area
            let choices=document.createElement("div");
            choices.className="choices";
            for(let i=0;i<4;i++) {
                let one_choice=document.createElement("div");
                // let inpt=document.createElement("input");
                // let label=document.createElement("label");
                // inpt.id=`Q-${indx}Choice-${i+1}`;
                // inpt.type="radio";
                // inpt.name=`Q-${indx}Choice}`;
                // label.setAttribute("for",`Q-${indx}Choice-${i+1}`);
                one_choice.id=`Q-${indx}Choice-${i+1}`;
                one_choice.className="Achoice";
                one_choice.innerHTML=ele[`answer${i+1}`];
                // one_choice.appendChild(inpt);
                // one_choice.appendChild(label);
                choices.append(one_choice);
                qDiv.appendChild(choices);
            }

            Qarea.append(qDiv);
            indx++;
        });
    })
}

setTimeout(()=> {
// ----------------------------------main code--------------------------
let Qdivs=document.querySelectorAll(".question");
let choices=document.querySelectorAll(".Q-active .Achoice");

QuizTime(duration);
myApplication.classList.remove("disabled");
// handle choices for first time
handleChoices(choices);
if(currentQ===1) {
    previous.classList.add("disabled");
}

next.addEventListener("click",handleNext);
previous.addEventListener("click",handlePrev);
end.addEventListener("click",handleEnd);
result.addEventListener("click",handleResult)

// next button
function handleNext () {
    if(currentQ<len) {
        previous.classList.remove("disabled");
        Qdivs[currentQ-1].classList.remove("Q-active");
        Qdivs[currentQ].classList.add("Q-active");
        currentQ++;
        if(currentQ===len) {
            next.classList.add("disabled");
            end.style.display="block";
            next.style.display="none";
        }
        choices=document.querySelectorAll(".Q-active .Achoice");
        handleChoices(choices);
    }
}

// previous button
function handlePrev () {
    if(currentQ<=len) {
        next.classList.remove("disabled");
        next.style.display="block";
        end.style.display="none";
    }

    if(currentQ>1) {
        Qdivs[currentQ-1].classList.remove("Q-active");
        Qdivs[currentQ-2].classList.add("Q-active");
        currentQ--;
        if(currentQ===1) {
            previous.classList.add("disabled");
        }
        choices=document.querySelectorAll(".Q-active .Achoice");
        handleChoices(choices);
    }
}

// handle choices

function handleChoices (choices) {
    choices.forEach((e)=> {
        e.onclick = function(event) {
            choices.forEach((ele)=> {
                ele.classList.remove("filled");
            })
            event.target.classList.add("filled");
        }
    })
}


function handleEnd () {
    message.style.cssText="opacity:1; z-index:2";
    control.classList.add("disabled");
    Qarea.classList.add("disabled");
    clearInterval(countTimer);
}

function handleResult () {
    let par=document.querySelectorAll(".question");
    let Answers=[];
    for(let i=0;i<len;i++) {
        let ch=par[i].children[2];
        let answer="";
        for(let i=0;i<4;i++) {
            if(ch.children[i].classList.contains("filled")) {
                answer=ch.children[i].textContent;
            }
        }
        Answers.push(answer);
    }
    let degree=0;
    for(let i=0;i<len;i++) {
        if(Answers[i]===correctAnswers[i]) degree++;
    }
    message.innerHTML=`<p>your degree is (${degree}/${len})</p>`
}

// build timer function
function QuizTime (duration) {
    countTimer=setInterval(()=> {
    let minutes=parseInt(duration/60);
    let sec=parseInt(duration%60);
    minutes = minutes<10 ? `0${minutes}` : minutes;
    sec = sec<10 ? `0${sec}` : sec;
        timer.innerHTML=`${minutes}:${sec}`;
        if(--duration<0) {
            clearInterval(countTimer);
            handleEnd();
        }
    },1000);
}
// -------------------------------------------------------------------------
},1000)
