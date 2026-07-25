//Fetches
async function fetchMatchesByRound (round) {
    const res = await fetch(`http://localhost:8080/getMatchesByRound/${round}`);
    const Matches = await res.json();
    return Matches;
}

async function getRoundsNumber () {
    const res = await fetch(`http://localhost:8080/getRoundsNumber`);
    const RoundsNumber = await res.json();
    return RoundsNumber;
}

async function fetchAccount () {
    const res = await fetch(`http://localhost:8080/currentUser`);
    if (!res.ok)
        return null;
    const text = await res.text();
    if (!text) 
        return null;
    return JSON.parse(text);
}

//Edit Data
async function changeMatchStatusRequest (MatchId, Status) {
    const res = await fetch (`http://localhost:8080/admin/changeStatues/${MatchId}/${Status}`, {
        method: "POST"
    });
    return res.ok;
}

//Handle Logging

async function Main () {

    localStorage.setItem("deleteAcc", "");
    localStorage.setItem("edit", "");

    let Account = await fetchAccount();

    let Arrow = document.querySelector(".round .container .arrow");
    let RoundUl = document.querySelector(".round .container ul");
    let Round = parseInt(localStorage.getItem("round")) ;
    let RoundSpan = document.querySelector(".round .container p span");
    let DateSpan = document.querySelector(".round .container .date");

    let MatchesDiv = document.querySelector(".matches .container");
    let Matches = await fetchMatchesByRound(Round);

    let box;
    let Submits;
    let EditResults;
    let SettingArrows;
    let OptionsUls;
    let Selects;
    let SubmitAll = document.querySelector(".matches .submit-all");
    let ArrowGoals;
    let GoalsUls;
    let IDsInputs;

    let DimOverlay = document.querySelector(".dim-overlay");
    let ProcessFailed = document.querySelector(".process-failed");
    let FaliedProcessOk = document.querySelector(".process-failed button");

    let StatusChanged;

    let Edits;

    await handleRoundSelection();

    Matches.forEach((Match) => {

        DateSpan.innerHTML = Match.match_date; 
        if (Round == 0)
            DateSpan.innerHTML = " ";

        box = document.createElement("div");
        box.classList.add("box");

        box.innerHTML = `
        <input class="id hiddin" value=${Match.id}></input>
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
            <p class="result"></p>
            <p class="status"></p>
            <div class="settingsArr"></div>
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

        EditResults = document.createElement("button");
        EditResults.innerHTML = "Edit Results";
        EditResults.classList.add("edit");

        if (Match.match_status == 11) 
            box.classList.add("disabled");

        MatchesDiv.append(box);

        gettingGoalsData("HomeTeam", Match, box);
        gettingGoalsData("AwayTeam", Match, box);
        handleStatusInfrastructure();
    });

    Matches.forEach((Match, index) => {
        handleVsBox(Match, index);
    })

    Submits = document.querySelectorAll(".submit");

    //Handle Rounds Ul
    Arrow.addEventListener("click", () => {
        Arrow.classList.toggle("active");
        RoundUl.classList.toggle("active");
    });

    //Handle Status Choice
    SettingArrows = document.querySelectorAll(".matches .container .settingsArr");
    OptionsUls = document.querySelectorAll(".matches .container .options");
    if ( Account !== null && Account.roles[0] == "admin") {
        SettingArrows.forEach((arrow, index) => {
            arrow.classList.add("appear");
            arrow.addEventListener("click", () => {
                arrow.classList.toggle("active");
                OptionsUls[index].classList.toggle("active");
            })
        })
    }

    IDsInputs = document.querySelectorAll(".id");
    Selects = document.querySelectorAll("select");
    Submits.forEach((submit, index) => {
        submit.addEventListener("click", async () => {
            StatusChanged = await changeMatchStatusRequest(IDsInputs[index].value, Selects[index].value);
            if (StatusChanged) {
                document.location.reload();
            } else {
                ProcessFailed.classList.add("highlighted");
                ProcessFailed.classList.add("active");
                DimOverlay.classList.add("dim");
            }
        })
    })

    SubmitAll.addEventListener("click", async () => {
        for(let i = 0 ; i < Matches.length; i++) {
            StatusChanged = await changeMatchStatusRequest(IDsInputs[i].value, Selects[i].value);
            if (!StatusChanged)
                break;
        }
        if(!StatusChanged) {
            ProcessFailed.classList.add("highlighted");
            ProcessFailed.classList.add("active");
            DimOverlay.classList.add("dim");
        } else {
            document.location.reload();
        }
    })

    //Handle Goals Details
    ArrowGoals = document.querySelectorAll(".matches .container .box .text .arrowGoals");
    GoalsUls = document.querySelectorAll(".matches .container .box .team .text .goals");
    ArrowGoals.forEach((Arrow, index) => {
        let match = Matches[Math.floor(index / 2)];
        Goals = match.goals;
        HomeGoals = Goals.filter(goal => goal.team.id === match.homeTeam.id);
        AwayGoals = Goals.filter(goal => goal.team.id === match.awayTeam.id);
        if (index % 2 === 0) {
            Arrow.style.display = HomeGoals.length === 0 ? "none" : "block";
        } else {
            Arrow.style.display = AwayGoals.length === 0 ? "none" : "block";
        }
        Arrow.addEventListener("click", () => {
            Arrow.classList.toggle("active");
            GoalsUls[index].classList.toggle("active");
        });
    });

    //Handling Results
    Edits = document.querySelectorAll(".edit");
    Edits.forEach((Edit, index) => {
        Edit.addEventListener("click", () => {
            let Round = RoundSpan.textContent;
            localStorage.setItem("match_index", index + 1);
            localStorage.setItem("round", Round);
            location.href = "HandleResults.html";
        })
    })

    let safeAreas1 = document.querySelectorAll(".box");
    let safeAreas2 = document.querySelectorAll("ul.options");

    document.addEventListener("click", (event) => {
    let clickedInside = Array.from(safeAreas1).some(area => area.contains(event.target)) || Array.from(safeAreas2).some(area => area.contains(event.target));

        if (!clickedInside) {
            document.querySelectorAll(".options.active").forEach(el => el.classList.remove("active"));
            document.querySelectorAll(".settingsArr.active").forEach(el => el.classList.remove("active"));
        }
    });

    //POP-UP
    FaliedProcessOk.addEventListener("click", () => {
        ProcessFailed.classList.remove("active");
        DimOverlay = document.querySelector(".dim-overlay");
        DimOverlay.classList.remove("dim");
    })
}

//Handle Rounds Selection 
async function handleRoundSelection () {
    let Round = localStorage.getItem("round") || 1;
    let RoundSpan = document.querySelector(".round .container p span");
    let RoundUl = document.querySelector(".round .container ul");
    let RoundsLis;
    let li;

    RoundSpan.innerHTML = Round;
    if(Round == 0)
        RoundSpan.innerHTML = "Special";

    for ( let i = 0 ; i <= await getRoundsNumber() ; i ++) {
        li = document.createElement("li");
        if (i == await getRoundsNumber())
            li.innerHTML = `Special Round`;
        else
            li.innerHTML = `Round ${i + 1}`;
        RoundUl.append(li);
    }

    RoundsLis = document.querySelectorAll(".round .container ul li");
    RoundsLis.forEach(async (li, index) => {
        li.addEventListener("click", async () => {
            if (index == await getRoundsNumber())
                localStorage.setItem("round", 0);
            else
                localStorage.setItem("round", index + 1);
            document.location.reload();
        })
    })
}

//Handle Goals Data
function gettingGoalsData (TeamType, Match, box) {
    let TeamGoalsDiv;
    let TeamGoals;
    let GoalLi;
    let Goals = Match.goals;

    if (TeamType == "HomeTeam") {
        TeamGoals = Goals.filter(goal => goal.team.id === Match.homeTeam.id );
        TeamGoalsDiv = box.querySelector(".team1 .goals");
    } else {
        TeamGoals = Goals.filter(goal => goal.team.id === Match.awayTeam.id );
        TeamGoalsDiv = box.querySelector(".team2 .goals");
    }

    TeamGoals.forEach((goal) => {
        GoalLi = document.createElement("li")
        GoalLi.innerHTML = `
            ${goal.player.name} ${goal.goal_time_min} : ${goal.goal_time_sec}
        `
        TeamGoalsDiv.append(GoalLi);
    })
}

//Handle Goals And Penalties Result
function handleVsBox (Match, index) {
    let Goals = Match.goals;
    let HomeGoals = Goals.filter(goal => goal.team.id === Match.homeTeam.id );
    let AwayGoals = Goals.filter(goal => goal.team.id === Match.awayTeam.id );

    let Penalties = Match.penalties;
    let HomePenalties = Penalties.filter(p => p.team.id === Match.homeTeam.id && p.scored == 1);
    let AwayPenalties = Penalties.filter(p => p.team.id === Match.awayTeam.id && p.scored == 1);

    let VSResults = document.querySelectorAll(".matches .container .VS .result");
    let VSStatus = document.querySelectorAll(".matches .container .VS .status");
    let Options = document.querySelectorAll("select option");    

    let Time = new Date();
    let Match_Time = Match.match_time.substring(0,2);
    Time.setHours(Match_Time, 0, 0, 0);
    let now = new Date();
    let diff = now - Time;
    let minutes = Math.floor(diff / 60000);
    let seconds = Math.floor((diff % 60000) / 1000);

    for (let i = index * 11; i < index * 11 + 11; i++) {
        if (Match.match_status == Options[i].value) {
            Options[i].selected = true;
            break;
        }
    }

    switch(Match.match_status) {
        case 0:
            VSResults[index].innerHTML = Match.match_time;
            if (Match.match_round == 0)
                VSResults[index].innerHTML = `${Match.match_time} <br> ${Match.match_date}`;
            break;
        case 1:
            VSResults[index].innerHTML = `${HomeGoals.length} - ${AwayGoals.length}`;
            VSStatus[index].innerHTML = `${minutes} : ${seconds}`
            break;
        case 2:
            VSResults[index].innerHTML = `${HomeGoals.length} - ${AwayGoals.length}`;
            VSStatus[index].innerHTML = `Half time`;
            break;
        case 3:
            VSResults[index].innerHTML = `${HomeGoals.length} - ${AwayGoals.length}`;
            VSStatus[index].innerHTML = `${minutes - 15} : ${seconds}`
            break;
        case 4:
            VSResults[index].innerHTML = `${HomeGoals.length} - ${AwayGoals.length}`;
            VSStatus[index].innerHTML = `Full time`
        break;
        case 5:
            VSResults[index].innerHTML = `${HomeGoals.length} - ${AwayGoals.length}`;
            VSStatus[index].innerHTML = `${minutes - 20} : ${seconds}`
            break;
        case 6:
            VSResults[index].innerHTML = `${HomeGoals.length} - ${AwayGoals.length}`;
            VSStatus[index].innerHTML = `Half time`
            break;
        case 7:
            VSResults[index].innerHTML = `${HomeGoals.length} - ${AwayGoals.length}`;
            VSStatus[index].innerHTML = `${minutes - 21} : ${seconds}`
            break;
        case 8:
            VSResults[index].innerHTML = `${HomeGoals.length} - ${AwayGoals.length}`;
            VSStatus[index].innerHTML = `${HomePenalties.length} - ${AwayPenalties.length}`;
            break;
        case 9:
            VSResults[index].innerHTML = `${HomeGoals.length} - ${AwayGoals.length}`;
            VSStatus[index].innerHTML = `Match Ended`;
            break;
        case 10:
            VSResults[index].innerHTML = `${HomeGoals.length} - ${AwayGoals.length}`;
            VSStatus[index].innerHTML = `${HomePenalties.length} - ${AwayPenalties.length} <br> Match Ended`;
            break;
        case 11:
            VSResults[index].innerHTML = ` `;
            VSStatus[index].innerHTML = `Diabled Match`;
            break;
    }
}

//Handle Match Status Infrastructure
function handleStatusInfrastructure () {
    let MatchesDiv = document.querySelector(".matches .container");
    let OptionsUl;

    OptionsUl = document.createElement("ul")
    OptionsUl.classList.add("options");

    OptionsUl.innerHTML =`
        <div>
            <select>
                <option value="0">Hasn't started yet</option>
                <option value="1">First half</option>
                <option value="2">Break 1</option>
                <option value="3">Second half</option>
                <option value="4">Break 2</option>
                <option value="5">Extra time half 1</option>
                <option value="6">Break 3</option>
                <option value="7">Extra time half 2</option>
                <option value="8">Penalties</option>
                <option value="9">End Match</option>
                <option value="10">End Match With Penalties</option>
                <option value="11">Disabled Match</option>
            </select>
            <button class="submit">Submit</button>
        </div>
        <button class="edit">Edit Results</button>
    `
    MatchesDiv.append(OptionsUl);
}

Main();