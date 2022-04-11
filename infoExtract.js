//node infoExtract.js --excel=Worldcup.csv --dataFolder=data --source=https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results


let minimist = require("minimist");
let excel = require("excel4node");
let pdf = require("pdf-lib");
let jsdom = require("jsdom");

let args = minimist(process.argv);
let axios = require("axios");

// download using axios
// extract information using jsdom
// manipulate data using array functions
// save in excel using excel4node
// create folders and prepare pdfs


let responseKpromise = axios.get(args.source);
responseKpromise.then(function(response){
let html = response.data;

let dom = new jsdom.JSDOM(html);
let document = dom.window.document;

let matches = [];

let matchdivs = document.querySelectorAll("div.match-score-block");

for(let i = 0; i<matchdivs.length ; i++){
    let matchdiv = matchdivs[i];
    
    let match = {
        t1 : "",
        t2 : "",
        t1Score : "",
        t2Score : "",
        result : ""
    };

  

    let resultSpan = matchdiv.querySelector("div.status-text > span");
    match.result = resultSpan.textContent;

    let teamParas = matchdiv.querySelectorAll("div.name-detail > p.name");
    match.t1 = teamParas[0].textContent;
    match.t2 = teamParas[1].textContent;

    let ScoreSpan = matchdiv.querySelectorAll("div.score-detail > span.score");

    if(ScoreSpan.length == 2){
        match.t1Score = ScoreSpan[0].textContent;
        match.t2Score = ScoreSpan[1].textContent;
    } else if (ScoreSpan.length == 1){
        match.t1Score = ScoreSpan[0].textContent;
        match.t2Score = "";
    } else {
        match.t1Score = "";
        match.t2Score = "";
    }

    matches.push(match);

}
console.log(matches);

let teams = [];

for(let i=0 ; i<matches.length ; i++){
    populateTeams(matches[i],teams);
};

console.log(teams);

});


function populateTeams (match , teams){

let t1idx = -1;

for(let i=0 ; i<teams.length ; i++){
    if(match.t1 == teams[i].teamName){
        t1idx = i;
        break;
    }
};

if(t1idx == -1){
    let t = {
        teamName : match.t1,
        matches : []
    };
    teams.push(t);
};


let t2idx = -1;

for(let i=0 ; i<teams.length ; i++){
    if(match.t2 == teams[i].teamName){
        t2idx = i;
        break;
    }
};

if(t2idx == -1){
    let t = {
        teamName : match.t2,
        matches : []
    };
    teams.push(t);
};



};

function fillMatches(match,teams){

     let t1idx = -1;

     for(let i=0 ; i<teams.length ; i++){
         if(match.t1 == teams[i].teamName){
             t1idx = i;
             break;
         }
     }

    let team1 = teams[t1idx];
    team1.matches({
        
    })

     
     

}