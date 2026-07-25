//Fetches
async function fetchMatch (Match_id) {
    const res = await fetch(`https://footballmanagementsystem-production-27eb.up.railway.app/getMatch/${Match_id}`);
    const Match = await res.json();
    return Match;
}

async function fetchTeamById (Team_id) {
    const res = await fetch(`https://footballmanagementsystem-production-27eb.up.railway.app/getTeam/${Team_id}`);
    const Team = await res.json();
    return Team;
}


//Edit Data
async function deleteMatchResults (Match_id) {
    const res = await fetch(`https://footballmanagementsystem-production-27eb.up.railway.app/admin/deleteMatchResults/${Match_id}`, {
        method: "POST"
    });
    return res.ok;
}

async function addMatchResults (Match_id) {
    const res = await fetch(`https://footballmanagementsystem-production-27eb.up.railway.app/admin/addMatchResults/${Match_id}`, {
        method: "POST"
    });
    return res.ok;
}

async function deleteMatchGoalsRequest (Match_id) {
    const res = await fetch(`https://footballmanagementsystem-production-27eb.up.railway.app/admin/deleteGoalByMatch/${Match_id}`, {
        method: "POST"
    });
    return res.ok;
}

async function addGoalsRequest (Match_id, Player_id, Team_id, goal_time_min, goal_time_sec) {
    const res = await fetch(`https://footballmanagementsystem-production-27eb.up.railway.app/admin/addGoal/${Match_id}/${Player_id}/${Team_id}/${goal_time_min}/${goal_time_sec}`, {
        method: "POST"
    });
    return res.ok;
}

async function makingTableRequest () {
    const res = await fetch(`https://footballmanagementsystem-production-27eb.up.railway.app/makingTable`, {
        method: "POST"
    });
    return res.ok;
}


async function Main (TeamId) {

    localStorage.setItem("deleteAcc", "");
    localStorage.setItem("edit", "");
    // await makingTableRequest();

    let Match = await fetchMatch(localStorage.getItem("match_id"));
    let HomeId = Match.homeTeam.id;
    let AwayId = Match.awayTeam.id
    let teamId = (TeamId == "HomeTeamId"? HomeId : AwayId);
    let Team = await fetchTeamById(teamId);
    let Goals = Match.goals;
    let TeamGoals = Goals.filter(g => g.team.id == teamId);
    let GoalsNumber = TeamId == "HomeTeamId"? parseInt(localStorage.getItem("HomeResult")) : parseInt(localStorage.getItem("AwayResult"));    let Players = Team.players;
    let Mins;
    let Secs;

    let Head = document.createElement("div");
    let TeamHomeDiv = document.querySelector(".goals .container .team1");
    let TeamAwayDiv = document.querySelector(".goals .container .team2");
    let Submit = document.querySelector(".goals .submit");

    let PlayerSelection;
    let box;
    let Options;
    let Option;

    let ProcessStatus = document.querySelectorAll(".process-status");
    let ProcessStatusOk = document.querySelectorAll(".process-status button");
    let DimOverlay = document.querySelector(".dim-overlay");

    Head.classList.add("head");
    if (TeamId == "HomeTeamId") {
        Head.innerHTML = `
            <img src="data:image/png;base64,${Match.homeTeam.logo}" alt="">
            <p class="name">${Match.homeTeam.name}</p>
        `
        TeamHomeDiv.append(Head);
    } else {
        Head.innerHTML = `
            <img src="data:image/png;base64,${Match.awayTeam.logo}" alt="">
            <p class="name">${Match.awayTeam.name}</p>
        `
        TeamAwayDiv.append(Head);
    }

    for ( let i = 0; i < GoalsNumber; i++) {
        box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
                <h3>Goal: ${i + 1}</h3>
                <div class="players">
                    <p>Players: </p>
                    <select>
                        <option value="" disabled selected>Select a player</option>
                    </select>
                </div>
                <div class="Time">
                    <p>Minute: </p>
                    <input type="number" min="0" max="90" class="mins" step="1" value="1">
                    <p>Secound: </p>
                    <input type="number" min="0" max="59" class="secs" step="1" value="1">
                </div>
        `

        PlayerSelection = box.querySelector("select");
        Players.forEach((player) => {
            Option = document.createElement("option");
            Option.value = player.id;
            Option.innerHTML = player.name;
            PlayerSelection.append(Option);
        })

        Options = PlayerSelection.querySelectorAll("option");
        Mins = box.querySelector(".mins");
        Secs = box.querySelector(".secs")
        if (i < TeamGoals.length) {
            Options.forEach((option) => {
                if (option.value == TeamGoals[i].player.id)
                    option.selected = true;
            })
            Mins.value = TeamGoals[i].goal_time_min;
            Secs.value = TeamGoals[i].goal_time_sec;
        }
        if (TeamId == "HomeTeamId") {
            TeamHomeDiv.append(box);
        } else {
            TeamAwayDiv.append(box);
        }
    }

    ProcessStatusOk.forEach((Ok) => {
        Ok.addEventListener("click", () => {
            ProcessStatus.forEach((Status) => {
                if (Status.classList.contains("process-success") && Status.classList.contains("active")) {
                    document.location.href = "Matches.html";
                }
                else {
                    Status.classList.remove("active");
                    DimOverlay.classList.remove("dim");
                }
            })
        })
    })

    Submit.addEventListener("click", async () => {
        if ( TeamId == "AwayTeamId")
            await deletingOldGoals(HomeId, AwayId);
    })

}

//Handle Deleting Goals
async function deletingOldGoals (HomeId, AwayId) {
    let Match_Id = parseInt(localStorage.getItem("match_id"));

    let SelectsHomeTeam = document.querySelectorAll(".team1 .box select");
    let SelectsAwayTeam = document.querySelectorAll(".team2 .box select");
    let MinsHomeInput = document.querySelectorAll(".team1 .box .mins");
    let SecsHomeInput = document.querySelectorAll(".team1 .box .secs");
    let MinsAwayInput = document.querySelectorAll(".team2 .box .mins");
    let SecsAwayInput = document.querySelectorAll(".team2 .box .secs");

    let DimOverlay = document.querySelector(".dim-overlay");
    let ProcessFailed = document.querySelector(".process-falied");

    let Deleted = (await deleteMatchResults(Match_Id) && await deleteMatchGoalsRequest(Match_Id));

    if (Deleted) {
        await submitGoals(HomeId, Match_Id, SelectsHomeTeam, MinsHomeInput, SecsHomeInput);
        await submitGoals(AwayId, Match_Id, SelectsAwayTeam, MinsAwayInput, SecsAwayInput);
        await addMatchResults(Match_Id);
        await makingTableRequest();
    }
    else {
        ProcessFailed.classList.add("highlighted");
        ProcessFailed.classList.add("active");
        DimOverlay.classList.add("dim");
    }
}


//Handle Submit Goals
async function submitGoals (TeamId, MatchId, Selects, Mins, Secs) {
    let Added = true;
    let DimOverlay = document.querySelector(".dim-overlay");
    let PlayerId;
    let goal_time_min;
    let goal_time_sec;

    let ProcessFailed = document.querySelector(".process-falied");
    let ProcessSuccess = document.querySelector(".process-success");
    let SuccessP = document.querySelector(".process-success p");

    for ( let i = 0 ; i < Selects.length; i++) {
        if (Added) {
            PlayerId = Selects[i].value;
            goal_time_min = parseInt(Mins[i].value);
            goal_time_sec = parseInt(Secs[i].value);
            Added = await addGoalsRequest(MatchId, PlayerId, TeamId, goal_time_min, goal_time_sec);
        } else {
            break;
        }
    }

    if (Added) {
        SuccessP.innerHTML = "Goals added successfully";
        ProcessSuccess.classList.add("active");
        ProcessSuccess.classList.add("highlighted")
        DimOverlay.classList.add("dim");
    } else {
        ProcessFailed.classList.add("highlighted");
        ProcessFailed.classList.add("active");
        DimOverlay.classList.add("dim");
    }
}

Main("HomeTeamId");
Main("AwayTeamId");
