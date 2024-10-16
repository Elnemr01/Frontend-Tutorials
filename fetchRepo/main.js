let input= document.querySelector("#username");
let btn= document.querySelector("button");
let data= document.querySelector(".data");



btn.onclick=function () {
    getData();
}

function getData () {
    if(input.value=="") {
        data.innerHTML=`<span>please enter gitHub username.</span>`;
    }
    else {
        fetch(`https://api.github.com/users/${input.value}/repos`).then((resp=> resp.json()))
        .then((repos)=> {
            data.innerHTML="";
            repos.forEach((repo) => {
                // add repo name
                let mainDiv=document.createElement("div");
                let repoTxt=document.createTextNode(repo.name);
                mainDiv.appendChild(repoTxt);
                // add num of stars of each repo
                let span =document.createElement("span");
                let spanTxt= repo.stargazers_count===0 ? document.createTextNode("Not Stared") :document.createTextNode(`Stared: ${repo.stargazers_count} Times`);
                span.appendChild(spanTxt);
                mainDiv.appendChild(span);
                // add link to visit repo
                let link=document.createElement("a");
                let linkTxt=document.createTextNode("visit");
                link.appendChild(linkTxt);
                link.href=`https://github.com/${input.value}/${repo.name}`;
                link.target="_blank";
                mainDiv.appendChild(link);
                //add main div
                mainDiv.className="dataDiv";
                data.appendChild(mainDiv);
            });
    })
    }
}