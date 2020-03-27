//global variables

//array to hold previous app state(s) html
let history = [];
//counter to check against history, increases with each click
let historyCount = 0;

//variable to hold fetched chart data from data.json
let charts;

//fetch the data
function fetchData(){
    fetch('./data/data.json')
    .then(data => data.json())
    .then(data => {
        charts = data.charts;
        console.log(charts);
    })
}

//add html to history and increase history counter
function forwardHistory(){
    history.push(document.querySelector("#interactive").innerHTML);
    historyCount++;
}

//add html to history and decrease history counter
function backHistory(){
    if(historyCount.length > 1){
        history.pop();
        historyCount--;
        document.querySelector("#interactive").innerHTML = history[historyCount];    
    }
}

//load initial selections to page
function initialAdd(){
    for(let i = 0; i < charts.length; i++){
        document.querySelector("#interactive").innerHTML += `<button data-id="${i}">${charts[i].name}</button>`
    }
    forwardHistory();
}

//sequence events
function init(){
    fetchData();
    setTimeout(() => {
        initialAdd();
    }, 250);
}

//initialize
document.addEventListener("DOMContentLoaded", function(){
    init();
});