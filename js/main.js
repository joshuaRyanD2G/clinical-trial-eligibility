/****** global variables ******/
//array to hold previous app state(s) html
let history = [];
//counter to check against history, increases with each click
let historyCount = -1;
//modified array based on what the user interacts with
let workingArray = [];
//variable to hold fetched chart data from data.json
let charts;

/****** global functions ******/
//fetch the data
function fetchData(){
    fetch('./data/data.json')
    .then(data => data.json())
    .then(data => {
        charts = data.charts;
    })
}

//add html to history and increase history counter
function forwardHistory(){
    history.push({array: workingArray, html:document.querySelector("#interactive").innerHTML});
    historyCount++;
}

//add html to history and decrease history counter
function backHistory(){
    if(history.length > 1){
        history.pop();
        historyCount--;
        workingArray = history[historyCount].array;
        document.querySelector("#interactive").innerHTML = history[historyCount].html;    
    }
}

//load initial selections to page
function initialAdd(){
    for(let i = 0; i < charts.length; i++){
        document.querySelector("#interactive").innerHTML += `<button data-id="${i}" data-type="chart">${charts[i].name}</button>`
    }
    workingArray = charts;
    forwardHistory();
}

//update page contents and working array based on what is clicked
function updatePage(targetID, type){
    //the target object
    let selected = workingArray[targetID];
    if(type == "chart"){
        //update working array with selection
        workingArray = selected.chart;
        //clear content
        document.querySelector("#interactive").innerHTML = ``;
        //update page contents
        for(let i = 0; i < workingArray.length; i++){
            document.querySelector("#interactive").innerHTML += `<button data-id="${i}" data-type="node">${workingArray[i].node}</button>`
        }            
    }
    else if(type == "node"){
        //update working array with selection
        workingArray = selected.tree;
        //clear content
        document.querySelector("#interactive").innerHTML = ``;
        //update page contents
        for(let i = 0; i < workingArray.length; i++){
            document.querySelector("#interactive").innerHTML += `<button data-id="${i}" data-type="branch">${workingArray[i].branch}</button>`
        }    
    }else if(type == "branch"){
        //update working array with selection
        workingArray = selected.subBranches;
        //clear content
        document.querySelector("#interactive").innerHTML = ``;
        //update page contents
        for(let i = 0; i < workingArray.length; i++){
            //if the branch is is not a trial
            workingArray[i].branch != "trial" ?
            document.querySelector("#interactive").innerHTML += `<button data-id="${i}" data-type="branch">${workingArray[i].branch}</button>`
            :
            document.querySelector("#interactive").innerHTML += 
                `<div class="trialInfo">
                    <h3>Trial Information</h3>
                    <p class="trialName">${workingArray[i].trial}</p>
                    <p class="trialRN">RN: ${workingArray[i].rn}</p>
                    <p class="trialRecruitment">Recruitment: ${workingArray[i].recruitment}</p>
                 </div>`;
        }    
    }else{
        console.error("Load error");
    }
    //if there are no page contents
    if(document.querySelector("#interactive").innerHTML == ``){
        document.querySelector("#interactive").innerHTML += `<p>no available trials at this time</p>`;
    }
    forwardHistory();
}

//sequence events
function init(){
    //intro animation    
    TweenMax.to("#splashLogo", 0.75, {
        delay: 0.5,
        opacity: 0
    });
    TweenMax.from(["main", "#logo"], 0.5, {
        delay: 1.2,
        opacity: 0
    });
    fetchData();
    setTimeout(() => {
        initialAdd();
    }, 250);
}

//initialize
document.addEventListener("DOMContentLoaded", function(){
    init();
    document.addEventListener("click", (e) => {
        if(e.target.tagName == "BUTTON"){
            updatePage(e.target.dataset.id, e.target.dataset.type);
        }else if(e.target == document.querySelector("#backButton")){
            backHistory();
        }else if(e.target == document.querySelector("#resetButton")){
            document.location.reload();
        }
    })
});