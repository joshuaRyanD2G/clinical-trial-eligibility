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
//sequence events
function init(){
    fetchData();
}

//initialize
document.addEventListener("DOMContentLoaded", function(){
    init();
});