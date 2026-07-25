//Fetch Matches
async function fetchMatchesByRound (Round) {
    const res = await fetch(`http://localhost:8080/getMatchesByRound/${Round}`);
    let Matches = await res.json();
    return Matches;
}

async function fetchPlayersByTeam (Team) {
    const res = await fetch(`http://localhost:8080/admin/getPlayersByTeam/${Team.id}`);
    const Players = await res.json();
    return Players;
}

//Edit Data
async function deleteGoalsByMatchRequest (Match) {
    const res = await fetch(`http://localhost:8080/admin/deleteGoalByMatch/${Match.id}`, {
        method: "POST"
    });
    return res.ok;
}

async function addMatchResults (Match) {
    const res = await fetch(`http://localhost:8080/admin/addMatchResults/${Match.id}`, {
        method: "POST"
    });
    return res.ok;
}

async function addPenaltyRequest (Match, Player, Team, Scored, num) {
    const res = await fetch(`http://localhost:8080/admin/addPenalty/${Match.id}/${Player}/${Team.id}/${Scored}/${num}`, {
        method: "POST"
    });
    return res.ok;
} 

async function deleteMatchResults (Match) {
    const res = await fetch(`http://localhost:8080/admin/deleteMatchResults/${Match.id}`, {
        method: "POST"
    });
    return res.ok;
}

async function deletePenaltyRequest (PenaltyId) {
    const res = await fetch(`http://localhost:8080/admin/deletePenalty/${PenaltyId}`, {
        method: "POST"
    });
    return res.ok;
} 

async function deletePenaltiesByMatchRequest (Match) {
    const res = await fetch(`http://localhost:8080/admin/deletePenaltiesByMatch/${Match.id}`, {
        method: "POST"
    });
    return res.ok;
}

async function makingTableRequest () {
    const res = await fetch(`http://localhost:8080/makingTable`, {
        method: "POST"
    });
    return res.ok;
}


//Handle The Infrastructure And the Contorles
async function Main () {

    localStorage.setItem("deleteAcc", "");
    localStorage.setItem("edit", "");

    let Matches = await fetchMatchesByRound(localStorage.getItem("round"));
    let Match = Matches[localStorage.getItem("match_index") - 1];
    let Round = localStorage.getItem("round");

    let MatchesDiv = document.querySelector(".matches .container");
    let box = document.createElement("div");
    let HomeReuslt; 
    let AwayReuslt;
    let Submit;
    let Deleted;

    let ArrowGoals; 
    let GoalsUls;

    let RoundSelection;
    let MatchSelection;
    let SelectionSubmit;

    let DimOverlay = document.querySelector(".dim-overlay");
    let ProcessFailed = document.querySelector(".process-failed");
    let ProcessSuccess = document.querySelector(".process-success");
    let failedProcessOk = document.querySelector(".process-failed button");
    let SuccessProcessOk = document.querySelector(".process-success button");

    let PenaltiesIds;
    let PenaltiesSubmites;
    let PenaltiesEdits;
    let PenaltiesSelects;
    let PenaltiesRadiosDiv;
    let Checkedradio;
    let PenaltyId;
    let PenaltyDeleted;

    //The Infrastructure
    localStorage.setItem("match_id", Match.id);
    box.classList.add("box");
    box.innerHTML = `
        <div class="team team1">
            <div class="image">
                <img src="data:image/png;base64,${Match.homeTeam.logo}" alt="">
            </div>
            <div class="text">
                <p>${Match.homeTeam.name}</p>
                <div class="arrowGoals arrow1"></div>
                <ul class="goals">
                </ul>
            </div>
        </div>
        <div class="VS">
            <input class="home" type="text">
            <input class="away" type="text">
        </div>
        <div class="team team2">
            <div class="image">
                <img src="data:image/png;base64,${Match.awayTeam.logo}" alt="">
            </div>
            <div class="text">
                <p>${Match.awayTeam.name}</p>
                <div class="arrowGoals arrow2"></div>
                <ul class="goals">
                </ul>
                </div>
            </div>
        </div>
    `

    Submit = document.createElement("button");
    Submit.classList.add("submit");
    Submit.innerHTML = "Submit";
    Submit.type = "button";

    MatchesDiv.append(box);
    MatchesDiv.append(Submit);

    // Handle Goals
    ArrowGoals = document.querySelectorAll(".matches .container .box .text .arrowGoals");
    GoalsUls = document.querySelectorAll(".matches .container .box .team .text .goals");
    ArrowGoals.forEach((Arrow, index) => {
            Arrow.addEventListener("click", () => {
            Arrow.classList.toggle("active");
            GoalsUls[index].classList.toggle("active");
        })
    })

    //Handle Next Match Selection
    SelectionSubmit = document.querySelector(".selection .container .submit");
    SelectionSubmit.addEventListener("click", async () => {
        RoundSelection = document.querySelector(".selection .round");
        MatchSelection = document.querySelector(".selection .match");
        localStorage.setItem("round", RoundSelection.value);
        localStorage.setItem("match_index", MatchSelection.value);
        document.location.reload();
    })

    //Handle Adding Goals
    HomeReuslt = document.querySelector(".home");
    AwayReuslt = document.querySelector(".away");
    Submit.addEventListener("click", async () => {
        if (HomeReuslt.value == 0 && AwayReuslt.value == 0) {
            Deleted = await deleteGoalsByMatchRequest(Match);
            await deleteMatchResults(Match)
            await addMatchResults(Match);
            await makingTableRequest();
            if (Deleted) 
                location.href = "Matches.html";
            else {
                ProcessFailed.classList.add("highlighted");
                ProcessFailed.classList.add("active");
                DimOverlay.classList.add("dim");
            }
        } else {
            localStorage.setItem("HomeResult", HomeReuslt.value);
            localStorage.setItem("AwayResult", AwayReuslt.value);
            location.href = "HandleGoals.html";
        }
    })

    //Handle Penalties
    if ( Match.match_status == 8 || Match.match_status == 10) {
        await Penalties("HomeTeam", Match);
        await Penalties("AwayTeam" ,Match);

        PenaltiesIds = document.querySelectorAll(".penalties .id");
        PenaltiesSubmites = document.querySelectorAll(".penalties .submit");
        PenaltiesEdits = document.querySelectorAll(".penalties .edit");
        PenaltiesSelects = document.querySelectorAll(".penalties .players");

        //Submit One Penalty
        PenaltiesSubmites.forEach((submit, index) => {
            submit.addEventListener("click", async () => {
                PenaltiesRadiosDiv = document.querySelectorAll('.penalties .radios');
                Checkedradio = PenaltiesRadiosDiv[index].querySelector('input[type="radio"]:checked');
                if (await submitPenalties(index, Match, PenaltiesSelects[index].value, submit, PenaltiesEdits[index], Checkedradio.value)) {
                    document.location.reload();
                }
            })
        })

        //Edit Or Delete One Penalty
        PenaltiesEdits.forEach((edit, index) => {
            edit.addEventListener("click", async () => {
                PenaltyId = PenaltiesIds[index].value;
                PenaltyDeleted = await deletePenaltyRequest(PenaltyId);
                if (PenaltyDeleted) {
                    edit.classList.toggle("active");
                    PenaltiesSubmites[index].classList.toggle("active");
                    document.location.reload();
                } else {
                    ProcessFailed.classList.add("highlighted");
                    ProcessFailed.classList.add("margined");
                    ProcessFailed.classList.add("active");
                    DimOverlay.classList.add("dim");
                }
            })
        })
    }

    //POP-UPs
    failedProcessOk.addEventListener("click", () => {
        ProcessFailed.classList.remove("active");
        ProcessFailed.classList.remove("margined");
        DimOverlay = document.querySelector(".dim-overlay");
        DimOverlay.classList.remove("dim");
    })

    SuccessProcessOk.addEventListener("click", () => {
        ProcessSuccess.classList.remove("active");
        ProcessSuccess.classList.remove("margined");
        DimOverlay = document.querySelector(".dim-overlay");
        DimOverlay.classList.remove("dim");
    })

    handleMatchGoals("HomeTeam", box, Match);
    handleMatchGoals("AwayTeam", box, Match);
    handleRoundMatchSelection(Round);
}

//Handle Match Goals 
function handleMatchGoals (Team, box, Match) {
    let TeamGoalsDiv;
    let GoalLi;
    let Arrow;
    let GoalsInput;
    let Goals = Match.goals;
    let TeamGoals;

    if (Team == "HomeTeam") {
        TeamGoalsDiv = box.querySelector(".team1 .goals");
        Arrow = document.querySelector(".matches .container .box .team1 .text .arrowGoals");
        GoalsUls = document.querySelector(".matches .container .box .team1 .text .goals");
        GoalsInput = document.querySelector(".matches .container .VS .home");
        TeamGoals = Goals.filter(g => g.team.id == Match.homeTeam.id);
    } else {
        TeamGoalsDiv = box.querySelector(".team2 .goals");
        Arrow = document.querySelector(".matches .container .box .team2 .text .arrowGoals");
        GoalsUls = document.querySelector(".matches .container .box .team2 .text .goals");
        GoalsInput = document.querySelector(".matches .container .VS .away");
        TeamGoals = Goals.filter(g => g.team.id == Match.awayTeam.id);
    }

    TeamGoals.forEach((goal) => {
        GoalLi = document.createElement("li")
        GoalLi.innerHTML = `
            ${goal.player.name} ${goal.goal_time_min} : ${goal.goal_time_sec}
        `
        TeamGoalsDiv.append(GoalLi);
    })

    TeamGoals.length == 0 ? Arrow.style.display = "none": Arrow.style.display = "block";
    GoalsInput.value = TeamGoals.length;

}

//Handle Round And Match Selection
async function handleRoundMatchSelection (Round) {

    let Matches = await fetchMatchesByRound(Round);
    let RoundSelection = document.querySelector(".selection .round");
    let MatchSelection = document.querySelector(".selection .match");
    let MatchOption;
    let RoundOption;

    Matches.sort ((a, b) => a.id - b.id);
    for ( let i = 1; i <= 19; i++) {
        RoundOption = document.createElement("option")
        RoundOption.value = i;
        if(Round == i) {
            RoundOption.selected = true;
        }
        RoundOption.innerHTML = `Round ${i}`;
        RoundSelection.append(RoundOption);
    }

    for (let i = 0 ; i < 10 ; i ++) {
        MatchOption = document.createElement("option")
        MatchOption.value = i + 1;
        if ( i + 1 == localStorage.getItem("match_index"))
            MatchOption.selected = true;
        MatchOption.innerHTML = `Match ${i + 1}`;
        MatchSelection.append(MatchOption);
    }

}

//Submit Penalties 
async function submitPenalties (index, Match , Player, Submit, Edit, Scored) {
    let Team;
    let Added = false;
    let DimOverlay = document.querySelector(".dim-overlay");
    let ProcessFailed = document.querySelector(".process-failed");
    Team = index < 5? Match.homeTeam : Match.awayTeam;
    if ( Scored !== 2) {
        Added = await addPenaltyRequest(Match, Player, Team, Scored, index + 1);
        if (Added) {
            Submit.classList.toggle("active");
            Edit.classList.toggle("active");
        } else {
            ProcessFailed.classList.add("highlighted");
            ProcessFailed.classList.add("margined");
            ProcessFailed.classList.add("active");
            DimOverlay.classList.add("dim");
        }
    }
    return Added;
}

//Handle Penalties Infrastructure
async function Penalties (TeamType, Match) {
    let Team;
    TeamType == "HomeTeam" ? Team = Match.homeTeam : Team = Match.awayTeam;
    let HomePenaltiesDiv = document.querySelector(".penalties .team1");
    let AwayPenaltiesDiv = document.querySelector(".penalties .team2");
    let Players = await fetchPlayersByTeam(Team);
    let Penalties = Match.penalties;
    let TeamPenalties = Penalties.filter(p => p.team.id == Team.id);
    let PenaltyBox;
    let PlayersSelection;
    let Option;
    let idInput;
    let submit;
    let edit;
    let Radios;

    TeamPenalties.sort((a, b) => a.num - b.num);
    console.log(TeamPenalties);

    for ( let i = 0 ; i < 5 ;i ++)  {
        PenaltyBox = document.createElement("div");
        PenaltyBox.classList.add("box");
        PenaltyBox.innerHTML = `
            <div class="head">
                <h4>Penalty ${i + 1}</h4>
                    <select class="players">
                        <option value="" disabled selected>Select a player</option>
                    </select>
                </div>
                <input type="text" class="id" style="display: none;"></input>
                <div class="radios">
                    <label>
                        <input type="radio" name="${TeamType}_penalty${i}}" value="2" checked>
                        Not Played
                    </label>   
                    <label>
                        <input type="radio" name="${TeamType}_penalty${i}}" value="1">
                        Scored
                    </label>   
                    <label>
                        <input type="radio" name="${TeamType}_penalty${i}}" value="0">
                        Not Scored
                    </label>                  
                </div>
                <div class="buttons">
                    <button class="submit active">Submit</button>
                    <button class="edit">Edit</button>
                </div>
        `

        PlayersSelection = PenaltyBox.querySelector(".players");
        Players.forEach((player) => {
            Option = document.createElement("option");
            Option.value = player.id;
            Option.innerHTML = player.name;
            if ( i < TeamPenalties.length && Option.value == TeamPenalties[i].player.id) {
                Option.selected = true;
                idInput = PenaltyBox.querySelector(".id")
                idInput.value = TeamPenalties[i].id;
                submit = PenaltyBox.querySelector(".submit")
                edit = PenaltyBox.querySelector(".edit")
                submit.classList.toggle("active");
                edit.classList.toggle("active");
            }
            PlayersSelection.append(Option);
        })

        if ( TeamPenalties[i]) {
            Radios = PenaltyBox.querySelectorAll('.radios input');
            if (TeamPenalties[i].scored == 1)
                Radios[1].checked = true;
            else if (TeamPenalties[i].scored == 0)
                Radios[2].checked = true;
        }

        TeamType == "HomeTeam"? HomePenaltiesDiv.append(PenaltyBox) : AwayPenaltiesDiv.append(PenaltyBox);
    }
}

Main();