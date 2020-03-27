//global variables

//array to hold previous app state(s) html
let history = [];

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

function initialAdd(){
    for(let i = 0; i < charts.length; i++){
        document.querySelector("#interactive").innerHTML += `<button data-id="${i}">${charts[i].name}</button>`
    }
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