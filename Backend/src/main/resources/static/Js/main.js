//Fetches
async function fetchMatchesbyStatus (status) {
    const res = await fetch(`https://footballmanagementsystem-production-27eb.up.railway.app/getMatchesByStatus/${status}`)
    const StatusMatches = await res.json();
    return StatusMatches;
}

async function fetchTeamTable () {
    const res = await fetch(`https://footballmanagementsystem-production-27eb.up.railway.app/getTable/`)
    const Table = await res.json();
    return Table;
}

async function fetchTeamGoals (team_id) {
    const res = await fetch(`https://footballmanagementsystem-production-27eb.up.railway.app/getGoalByTeam/${team_id}`)
    const Goals = await res.json();
    return Goals;
}

async function fetchGoalsCount () {
    const res = await fetch(`https://footballmanagementsystem-production-27eb.up.railway.app/getTableGoalsCount`);
    const Goals = await res.json();
    return Goals;
}

//Handle Time Counter
let weeksSpan = document.querySelector(".weeks");
let daysSpan = document.querySelector(".days");
let hoursSpan = document.querySelector(".hours");
let minsSpan = document.querySelector(".mins");
let secsSpan = document.querySelector(".secs");
let weeks, days, hours, mins, secs;
let WorldCupDate = new Date("June 11, 2026 00:00:00").getTime();

setInterval(function () {
    let now = new Date().getTime();
    let distance = WorldCupDate - now;

    weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
    days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    secs = Math.floor((distance % (1000 * 60)) / 1000);

    weeksSpan.innerHTML = weeks;
    daysSpan.innerHTML = days;
    hoursSpan.innerHTML = hours;
    minsSpan.innerHTML = mins;
    secsSpan.innerHTML = secs;

}, 1000);

// Handle Last Match 
async function loadLastMatch() {

    localStorage.setItem("deleteAcc", "");
    localStorage.setItem("edit", "");

    let LastMatchDiv = document.querySelector(".last-match .container");
    let matches9 = await fetchMatchesbyStatus(9);
    let matches10 = await fetchMatchesbyStatus(10);
    let Matches = [...new Set([...matches9, ...matches10])];
    let Match;
    if ( Matches.length == 0) 
        Matches = await fetchMatchesbyStatus(0);
    Matches.sort((a, b) => new Date(a.match_date) - new Date(b.match_date));
    Match = Matches.at(-1);

    LastMatchDiv.innerHTML = `
            <div class="team1 team">
                <div class="image">
                    <img src="data:image/png;base64,${Match.homeTeam.logo}" alt="">
                </div>
                <div class="text">
                    <p>${Match.homeTeam.name}</p>
                </div>
            </div>
                    <div class="VS">
                <p class="result"></p>
                <p class="status"></p>
            </div>
            <div class="team2 team">
                <div class="image">
                    <img src="data:image/png;base64,${Match.awayTeam.logo}" alt="">
                </div>
                <div class="text">
                    <p>${Match.awayTeam.name}</p>
                </div>
            </div>
    `

    let ResultDiv = document.querySelector(".last-match .result");
    let StatusDiv = document.querySelector(".last-match .status");

    let Goals = Array.from(Match.goals);
    let HomeGoals = Goals.filter(goal => goal.team.id === Match.homeTeam.id );
    let AwayGoals = Goals.filter(goal => goal.team.id === Match.awayTeam.id );

    let Penalties = Array.from(Match.penalties);
    let HomePenalties = Penalties.filter(p => p.team.id === Match.homeTeam.id && p.scored == 1);
    let AwayPenalties = Penalties.filter(p => p.team.id === Match.awayTeam.id && p.scored == 1);

    switch(Match.match_status) {
        case 0:
            ResultDiv.innerHTML = Match.match_time;
            break;
        case 9:
            ResultDiv.innerHTML = `${HomeGoals.length} - ${AwayGoals.length}`;
            StatusDiv.innerHTML = `Full Time`
            break;
        case 10:
            ResultDiv.innerHTML = `${HomeGoals.length} - ${AwayGoals.length}`;
            StatusDiv.innerHTML = `${HomePenalties.length} - ${AwayPenalties.length} <br> Match Ended`;
            break;
    }
}

//Handle Next Match
async function loadNextMatch () {
    let Matches = await fetchMatchesbyStatus(0);
    let Match = Matches[0];

    let HomeTableDiv = document.querySelector(".home-table .container");

    let NextMatch = document.createElement("div");
    NextMatch.classList.add("next-match");
    NextMatch.innerHTML = `
        <div class="head">
            <p>Next Match</p>
        </div>
        <div class="box b1">
            <div class="team team1">
                <img src="data:image/png;base64,${Match.homeTeam.logo}" alt="">
                <p>${Match.homeTeam.name}</p>
            </div>
            <div class="spans">
                <span class="s1"></span>
                <span class="mainSpan">VS</span>
                <span class="s2"></span>
            </div>
            <div class="team team2">
                <img src="data:image/png;base64,${Match.awayTeam.logo}" alt="">
                <p>${Match.awayTeam.name}</p>
            </div>
        </div>

        <div class="box b2">
            <p class="league">The Scorers League</p>
            <span></span>
            <p>New Euro Arena</p>
        </div>
    `

    HomeTableDiv.append(NextMatch);

}

//Handle Table
async function loadTable () {

    let Teams = await fetchTeamTable();
    let HomeTableDiv = document.querySelector(".home-table .container");
    let MiniTableDiv = document.createElement("div");
    MiniTableDiv.classList.add("mini-table");
    MiniTableDiv.innerHTML = `
        <div class="head">
            <div class="Ps">
                <p>P</p>
                <p>Team</p>
            </div>
            <div class="spans">
                <span>W</span>
                <span>D</span>
                <span>L</span>
                <span>G</span>
                <span>PTS</span>
            </div>
        </div>
        <div class="body"></div>
    `

    let TableBodyDiv = MiniTableDiv.querySelector(".mini-table .body");

    let Goals = await fetchGoalsCount();

    for ( let i = 0 ; i < 8; i++) {
        let TeamDiv = document.createElement("div");
        TeamDiv.classList.add("team");

        TeamDiv.innerHTML = `
        <div class="Ps">
            <p>${Teams[i].ranking}</p>
            <p>${Teams[i].name}</p>
        </div>
        <div class="spans">
            <span>${Teams[i].wins}</span>
            <span>${Teams[i].ties}</span>
            <span>${Teams[i].loses}</span>
            <span>${Goals[i]}</span>
            <span>${Teams[i].points}</span>
        </div>
        `

        TableBodyDiv.append(TeamDiv);
    }

    HomeTableDiv.append(MiniTableDiv);

}

loadLastMatch();
loadTable();
loadNextMatch();
