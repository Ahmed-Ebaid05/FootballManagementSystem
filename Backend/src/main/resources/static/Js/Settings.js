//Fetches
async function fetchTeamsInLeague () {
    const res = await fetch(`http://localhost:8080/getTeamsInLeague`);
    const Teams = await res.json();
    return Teams;
}

async function fetchTeamsOutLeague () {
    const res = await fetch(`http://localhost:8080/admin/getTeamsOutLeague`);
    const Teams = await res.json();
    return Teams;
}

async function fetchMatchesByRound () {
    const res = await fetch(`http://localhost:8080/getMatchesByRound/0`);
    const Matches = await res.json();
    return Matches;
}

async function fetchPlayerByTeam (TeamId) {
    const res = await fetch(`http://localhost:8080/admin/getPlayersByTeam/${TeamId}`);
    const Players = await res.json();
    return Players;
}

async function fetchMatchesNumberInRound (Round) {
    const res = await fetch(`http://localhost:8080/admin/getMatchesNumberInRound/${Round}`);
    const MatchesNumber = await res.json();
    return MatchesNumber;
}

async function fetchRoundNumber () {
    const res = await fetch(`http://localhost:8080/getRoundsNumber`);
    const RoundsNumber = await res.json();
    console.log(RoundsNumber);
    return RoundsNumber;
}

//Edit Data
async function changePlayerTeamRequest (Player, Team) {
    const res = await fetch (`http://localhost:8080/admin/changePlayerTeam/${Player}/${Team}`, {
        method: "POST"
    });
    return res.ok;
}

async function removingPlayerRequest (Player) {
    const res = await fetch (`http://localhost:8080/admin/removePlayer/${Player}`, {
        method: "POST"
    });
    return res.ok;
}

async function makingMatchesRequest (Rounds, Categories, Hrs, Mins) {
    const res = await fetch (`http://localhost:8080/admin/makingMatches/${Rounds}/${Categories}/${Hrs}/${Mins}`, {
        method: "POST"
    })
    return res.ok;
}

async function changeTeamLeagueRequest (TeamId, league) {
    const res = await fetch (`http://localhost:8080/admin/editTeamLeague/${TeamId}/${league}`, {
        method: "POST"
    });
    return res.ok;
}

async function addResultsRequest (Wins, Loses, Ties, TeamId) {
    const res = await fetch (`http://localhost:8080/admin/addResults/${Wins}/${Loses}/${Ties}/${TeamId}`, {
        method: "POST"
    });
    return res.ok;
}

async function deleteResultsRequest (Wins, Loses, Ties, TeamId) {
    const res = await fetch (`http://localhost:8080/admin/deleteResults/${Wins}/${Loses}/${Ties}/${TeamId}`, {
        method: "POST"
    });
    return await res.json();
}

async function makingTableRequest () {
    const res = await fetch(`http://localhost:8080/makingTable`, {
        method: "POST"
    });
    return res.ok;
}

async function addingMatchRequest (Home_id, Away_id, Year, Month, Day, Hrs, Mins) {
    const res = await fetch (`http://localhost:8080/admin/addingMatch/${Home_id}/${Away_id}/${Year}-${Month}-${Day}/${Hrs}/${Mins}`, {
        method: "PUT"
    });
    return [await res.json(), res.ok];
} 

async function deletingMatchRequest (MatchId) {
    const res = await fetch (`http://localhost:8080/admin/deleteMatchById/${MatchId}`, {
        method: "POST"
    });
    return res.ok;
} 

//Handle Teams Selection
async function Main () {

    localStorage.setItem("deleteAcc", "");
    localStorage.setItem("edit", "");

    let Teams = await fetchTeamsInLeague();
    let TeamSelectionDiv =  document.querySelector(".team-selection");
    let TeamsUl = document.querySelector(".team-selection .teams");
    let TeamsLis;
    let TeamSelectionClose = document.querySelector(".team-selection .X");
    let SearchInput = document.querySelector(".search");
    let SearchValue;
    let CurrentIndex = -1;

    let AddPlayer = document.querySelector(".add-player");

    let ChangeTeam = document.querySelector(".change-team");
    let ChangingTeam = document.querySelector(".changing-team");
    let ChangeTeamClose = document.querySelector(".changing-team .X");

    let RemovePlayer = document.querySelector(".remove-player");
    let RemovingPlayer = document.querySelector(".removing-player");
    let RemovePlayerClose = document.querySelector(".removing-player .X");

    let ReplaceTeam = document.querySelector(".replace-team");
    let ReplaceingTeam = document.querySelector(".replaceing-team") ;
    let ReplaceingTeamClose = document.querySelector(".replaceing-team .X") ;

    let MakingMatches = document.querySelector(".making-matches");
    let MakingMatchesClose = document.querySelector(".making-matches .X");
    let MakingTimes = document.querySelector(".making-times");
    let MakingTimesClose = document.querySelector(".making-times .X");

    let EditResults = document.querySelector(".edit-results");
    let EditingResults = document.querySelector(".editing-results");
    let EditingResultsClose = document.querySelector(".editing-results .X");

    let AddDelete = document.querySelector(".add-delete");
    let AddDeleteClose = document.querySelector(".add-delete .X");
    let AddResultBtn = document.querySelector(".add-delete .add-results");
    let DeleteResultBtn = document.querySelector(".add-delete .delete-results");

    let AddMatch = document.querySelector(".add-match");
    let AddingMatch = document.querySelector(".adding-match");
    let AddingMatchClose = document.querySelector(".adding-match .X");

    let DeleteMatch = document.querySelector(".delete-match");
    let DeletingMatch = document.querySelector(".deleting-match");
    let DeletingMatchClose = document.querySelector(".deleting-match .X");

    let NewTeam = document.querySelector(".new-team");

    let GenerateMatches = document.querySelector(".generate-matches");

    let DimOverlay = document.querySelector(".dim-overlay");
    let ProcessStatus = document.querySelectorAll(".process-status");
    let ProcessStatusOk = document.querySelectorAll(".process-status button");


    let Choice;

    //Making Team List Infrastructure
    Teams.forEach((team) => {
        let TeamLi = document.createElement("li");
        TeamLi.classList.add("team");
        TeamLi.innerHTML = team.name;
        TeamsUl.append(TeamLi);
    })

    TeamsLis = document.querySelectorAll(".teams .team");
    AddPlayer.addEventListener("click", () => {
        TeamSelectionDiv.classList.add("active");
        TeamSelectionDiv.classList.add("highlighted");
        DimOverlay.classList.add("dim");
        SearchInput.focus();
        Choice = "Add Player";
    })

    TeamSelectionClose.addEventListener("click", () => {
        TeamSelectionDiv.classList.remove("active");
        TeamSelectionDiv.classList.remove("highlighted");
        DimOverlay.classList.remove("dim");
    })

    SearchInput.addEventListener("input", () => {
        TeamsLis.forEach((Li) => {
            Li.classList.add("hiddin");
        })

    SearchValue = SearchInput.value.toLowerCase();

    TeamsLis.forEach((Li) => {
        if (Li.textContent.toLowerCase().includes(SearchValue))
            Li.classList.remove("hiddin");
        })
    })

    SearchInput.addEventListener("keydown", function (e) {
        if ( e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
        }

        if (e.key === "ArrowDown") {
            CurrentIndex = (CurrentIndex + 1 ) % TeamsLis.length
            handleActiveTeam(CurrentIndex, TeamsLis);
        }

        
        if (e.key === "ArrowUp") {
            CurrentIndex = (CurrentIndex - 1 + TeamsLis.length ) % TeamsLis.length
            handleActiveTeam(CurrentIndex, TeamsLis);
        }

    })

    //Handle Changing Team
    ChangeTeam.addEventListener("click", () => {
        TeamSelectionDiv.classList.add("active");
        TeamSelectionDiv.classList.add("highlighted");
        DimOverlay.classList.add("dim");
        SearchInput.focus();
        Choice = "Change Team";
    })

    ChangeTeamClose.addEventListener("click", () => {
        ChangingTeam.classList.remove("active");
        ChangingTeam.classList.remove("highlighted");
        DimOverlay.classList.remove("dim");
    })

    //Handle Remove Player
    RemovePlayer.addEventListener("click", () => {
        TeamSelectionDiv.classList.add("active");
        TeamSelectionDiv.classList.add("highlighted");
        DimOverlay.classList.add("dim");
        SearchInput.focus();
        Choice = "Remove Player";
    })

    RemovePlayerClose.addEventListener("click", () => {
        RemovingPlayer.classList.remove("active");
        RemovingPlayer.classList.remove("highlighted");
        DimOverlay.classList.remove("dim");
    })

    //Handle Replace Team
    ReplaceTeam.addEventListener("click", () => {
        TeamSelectionDiv.classList.add("active");
        TeamSelectionDiv.classList.add("highlighted");
        DimOverlay.classList.add("dim");
        SearchInput.focus();
        Choice = "Replace Team";
    })

    ReplaceingTeamClose.addEventListener("click", () => {
        ReplaceingTeam.classList.remove("active");
        ReplaceTeam.classList.remove("highlighted");
        DimOverlay.classList.remove("dim");
    })

    //Handle New Team
    NewTeam.addEventListener("click", () => {
        document.location.href = "AddingTeam.html";
    })

    //Handle Generate Matches
    GenerateMatches.addEventListener("click", async() => {
        await makingMatches(Teams);
    })

    MakingMatchesClose.addEventListener("click", () => {
        MakingMatches.classList.remove("active");
        MakingMatches.classList.remove("highlighted");
        DimOverlay.classList.remove("dim");
    })

    MakingTimesClose.addEventListener("click", () => {
        MakingTimes.classList.remove("active");
        MakingTimes.classList.remove("highlighted-1");
        DimOverlay.classList.remove("dim");
    })

    //Handle Edit Results
    EditResults.addEventListener("click", () => {
        TeamSelectionDiv.classList.add("active");
        TeamSelectionDiv.classList.add("highlighted");
        DimOverlay.classList.add("dim");
        SearchInput.focus();
        Choice = "Edit Results";
    })

    EditingResultsClose.addEventListener("click", () => {
        EditingResults.classList.remove("highlighted");
        EditingResults.classList.remove("active");
        DimOverlay.classList.remove("dim");
    })

    AddDeleteClose.addEventListener("click", () => {
        AddDelete.classList.remove("active");
        AddDelete.classList.remove("highlighted");
        DimOverlay.classList.remove("dim");
    })

    AddResultBtn.addEventListener("click", () => {
        AddDelete.classList.remove("active");
        AddDelete.classList.remove("highlighted");
        editResults("add");
    });

    DeleteResultBtn.addEventListener("click", () => {
        AddDelete.classList.remove("active");
        AddDelete.classList.remove("highlighted");
        editResults("delete");
    });

    //Add Match
    AddMatch.addEventListener("click", addingMatch);

    AddingMatchClose.addEventListener("click", () => {
        AddingMatch.classList.remove("active");
        AddingMatch.classList.remove("highlighted");
        DimOverlay.classList.remove("dim");
    })

    //Delete Match
    DeleteMatch.addEventListener("click", deletingMatch);

    DeletingMatchClose.addEventListener("click", () => {
        DeletingMatch.classList.remove("active");
        DeletingMatch.classList.remove("higghlited-1");
        DimOverlay.classList.remove("dim");
    })

    //Main Action
    TeamsLis.forEach((Li) => {
        Li.addEventListener("click", () => {
            Teams.forEach((team) => {
                if ( Li.textContent.toLowerCase().includes(team.name.toLowerCase())) {
                    localStorage.setItem("team_id", team.id);
                    if (Choice == "Add Player") 
                        document.location.href = "AddingPlayer.html";
                    else if (Choice == "Change Team") {
                        TeamSelectionDiv.classList.remove("active");
                        ChangingTeam.classList.add("highlighted");
                        DimOverlay.classList.add("dim");
                        SearchInput.focus();
                        changeTeam(Teams);
                    } else if (Choice == "Remove Player") {
                        TeamSelectionDiv.classList.remove("active");
                        RemovingPlayer.classList.add("highlighted");
                        DimOverlay.classList.add("dim");
                        SearchInput.focus();
                        removePlayer();
                    } else if (Choice == "Replace Team") {
                        TeamSelectionDiv.classList.remove("active");
                        ReplaceingTeam.classList.add("highlighted");
                        DimOverlay.classList.add("dim");
                        SearchInput.focus();
                        replaceTeam();
                    } else if (Choice == "Edit Results") {
                        TeamSelectionDiv.classList.remove("active");
                        EditingResults.classList.add("highlighted");
                        DimOverlay.classList.add("dim");
                        SearchInput.focus();
                        AddDelete.classList.add("active");
                        AddDelete.classList.add("highlighted");
                    }
                }
            })
        })
    })

    //POP-UPs
    ProcessStatusOk.forEach((Ok) => {
        Ok.addEventListener("click", () => {
            ProcessStatus.forEach((Status) => {
                if (Status.classList.contains("process-success") && Status.classList.contains("active")) {
                    Status.classList.remove("active");
                    document.location.reload();
                }
                else {
                    Status.classList.remove("active");
                    DimOverlay = document.querySelector(".dim-overlay");
                    DimOverlay.classList.remove("dim");
                }
            })
        })
    })

}

//Handle Change Player's Team
async function changeTeam (Teams) {

    let TeamsSelection = document.querySelector(".changing-team .teams");
    let ChangingTeam = document.querySelector(".changing-team");
    let Players = await fetchPlayerByTeam(localStorage.getItem("team_id"));
    let PlayersSelection = document.querySelector(".changing-team .players");
    let Option;

    let Submit = document.querySelector(".change-submit");
    let Transfered;

    let ProcessSuccess = document.querySelector(".process-success");
    let SuccessP = document.querySelector(".process-success p");
    let ProcessFailed = document.querySelector(".process-falied");

    ChangingTeam.classList.add("active");
    TeamsSelection.innerHTML = '<option value="" disabled selected>Select a team</option>';
    PlayersSelection.innerHTML = '<option value="" disabled selected>Select a player</option>';

    Teams.forEach((team) => {
        if ( team.id != parseInt(localStorage.getItem("team_id"))) {
            Option = document.createElement("option");
            Option.value = team.id;
            Option.innerHTML = team.name;
            TeamsSelection.append(Option);
        }
    })

    Players.forEach((player) => {
        Option = document.createElement("option");
        Option.value = player.id;
        Option.innerHTML = player.name;
        PlayersSelection.append(Option);
    })

    Submit.addEventListener("click", async () => {
        Transfered = await changePlayerTeamRequest(PlayersSelection.value, TeamsSelection.value)
        ChangingTeam.classList.remove("active");
        if ( Transfered) {
            ProcessSuccess = document.querySelector(".process-success");
            SuccessP = document.querySelector(".process-success p");
            SuccessP.innerHTML = "Player Transfred successfully";
            ProcessSuccess.classList.add("active");
            ProcessSuccess.classList.add("highlighted");
        } else {
            ProcessFailed = document.querySelector(".process-falied");
            ProcessFailed.classList.add("active");
            ProcessFailed.classList.add("highlighted");
        }
    })
}

//Handle Remove Player
async function removePlayer () {

    let RemovingPlayer = document.querySelector(".removing-player");
    let Players = await fetchPlayerByTeam(localStorage.getItem("team_id"));
    let PlayersSelection = document.querySelector(".removing-player .players");
    let Option;
    let Removed;
    let Submit = document.querySelector(".remove-submit");

    let ProcessSuccess = document.querySelector(".process-success");
    let SuccessP = document.querySelector(".process-success p");
    let ProcessFailed = document.querySelector(".process-falied");

    RemovingPlayer.classList.add("active");
    PlayersSelection.innerHTML = '<option value="" disabled selected>Select a player</option>';

    Players.forEach((player) => {
        Option = document.createElement("option");
        Option.value = player.id;
        Option.innerHTML = player.name;
        PlayersSelection.append(Option);
    })

    Submit.addEventListener("click", async () => {
        RemovingPlayer.classList.remove("active");
        Removed = await removingPlayerRequest(PlayersSelection.value);
        if (Removed) {
            ProcessSuccess = document.querySelector(".process-success");
            SuccessP = document.querySelector(".process-success p");
            SuccessP.innerHTML = "Player deleted successfully";
            ProcessSuccess.classList.add("active");
            ProcessSuccess.classList.add("highlighted");
        } else {
            ProcessFailed = document.querySelector(".process-falied");
            ProcessFailed.classList.add("highlighted");
            ProcessFailed.classList.add("active");
        }
    })
}

//Handle Replace Team
async function replaceTeam () {

    let replaceTeam = document.querySelector(".replaceing-team");
    let TeamsSelection = document.querySelector(".replaceing-team select");
    let Submit = document.querySelector(".replaceing-team .replace-submit");
    let Teams = await fetchTeamsOutLeague();
    let TeamsInLeague = await fetchTeamsInLeague();
    let Option;
    let ChangeLegaue;
    let ProcessFailed = document.querySelector(".process-falied");

    replaceTeam.classList.add("active");

    Teams.forEach((team) => {
        Option = document.createElement("option");
        Option.value = team.id;
        Option.innerHTML = team.name;
        TeamsSelection.append(Option);
    });

    Submit.addEventListener("click", async () => {
        ChangeLegaue = ( await changeTeamLeagueRequest(localStorage.getItem("team_id"), 2) && await changeTeamLeagueRequest(TeamsSelection.value, 1));
        replaceTeam.classList.remove("active");
        if (ChangeLegaue) {
            replaceTeam.classList.remove("active");
            replaceTeam.classList.remove("highlighted");
            await makingMatches(TeamsInLeague);
        } else {
            ProcessFailed = document.querySelector(".process-falied");
            ProcessFailed.classList.add("highlighted");
            ProcessFailed.classList.add("active");
        }
    })
}

//Handle Making Matches
async function makingMatches (Teams) {
    let MakingMatchesDiv = document.querySelector(".making-matches");
    let RoundsInput = document.querySelector(".rounds");
    let MatchesInRoundInput = document.querySelector(".matchesInRound");
    let CategoriesInput = document.querySelector(".categories");
    let Categories;

    let Rounds;

    let MatchesSubmit = document.querySelector(".matches-submit");

    let MakingTimes = document.querySelector(".making-times");

    let DimOverlay = document.querySelector(".dim-overlay");
    let ProcessFailed = document.querySelector(".process-falied");

    let TimesSubmit;

    let HrsSelects;
    let MinsSelects;

    let Option;

    DimOverlay.classList.add("dim");
    MakingMatchesDiv.classList.add("active");
    MakingMatchesDiv.classList.add("highlighted-1");
    MatchesInRoundInput.value = Teams.length / 2;

    MatchesSubmit.addEventListener("click", async () => {
        Rounds = parseInt(RoundsInput.value);
        Categories = parseInt(CategoriesInput.value);

        if (Rounds >= 3 && Rounds <= 50 && Categories > 0 && Categories <= Teams.length / 2 ) {

            for (let c = 0 ; c < Categories; c++) {

                HrsSelects = document.createElement("select");
                MinsSelects = document.createElement("select");

                HrsSelects.classList.add("hrs");
                MinsSelects.classList.add("mins");  

                for ( let i = 0; i< 24; i++) {
                    Option = document.createElement("option");
                    Option.value = i;
                    Option.innerHTML = i;
                    HrsSelects.append(Option);
                }

                for ( let i = 0; i< 60; i++) {
                    Option = document.createElement("option");
                    Option.value = i;
                    Option.innerHTML = i;
                    MinsSelects.append(Option);
                }


                Label = document.createElement("label");
                Label.innerHTML = `
                <p>Time of category ${c + 1}:</p>
                <div class="inputs">
                </div>
                `
                MakingTimes.append(Label);
                Inputs = Label.querySelector(".inputs");
                Inputs.append(HrsSelects);
                Inputs.append(MinsSelects);
            }

            TimesSubmit = document.createElement("button");
            TimesSubmit.classList.add("times-submit");
            TimesSubmit.innerHTML = "Submit";
            MakingTimes.append(TimesSubmit);
            MakingMatchesDiv.classList.remove("active");
            MakingMatchesDiv.classList.remove("highlighted-1");
            await matchesTimes(Rounds, Categories);
        } else {
            DimOverlay.classList.add("dim");
            ProcessFailed.classList.add("highlighted");
            ProcessFailed.classList.add("active");
            MakingMatchesDiv.classList.remove("active");
            MakingMatchesDiv.classList.remove("highlighted-1");
        }
    })

}

//Handle Matches Times 
async function matchesTimes (Rounds, Categories) {
    let MakingTimes = document.querySelector(".making-times");
    let Submit = document.querySelector(".times-submit");
    let HrsInputs = document.querySelectorAll(".hrs");
    let MinsInputs = document.querySelectorAll(".mins");
    let TimesHrs = [];
    let TimesMins = [];

    let ProcessFailed = document.querySelector(".process-falied");
    let ProcessSuccess = document.querySelector(".process-success");
    let SuccessP = document.querySelector(".process-success p");

    let RightTimes;
    let Maked;

    MakingTimes.classList.add("active");
    MakingTimes.classList.add("highlighted-1");

    Submit.addEventListener("click",  async () => { 
        TimesHrs.length = 0;
        TimesMins.length = 0;
        for ( let i = 0 ; i < Categories; i++ ) {
            if ( HrsInputs[i].value <= 23 && HrsInputs[i].value >= 0 && MinsInputs[i].value <= 59 && MinsInputs[i].value >= 0) {
                TimesHrs.push(`${parseInt(HrsInputs[i].value)}`)
                TimesMins.push(`${parseInt(MinsInputs[i].value)}`)
                RightTimes = true;
            } else {
                ProcessFailed.classList.add("highlighted");
                ProcessFailed.classList.add("active");
                RightTimes = false;
                break;
            }
        }

        if (RightTimes) {
            Maked = await makingMatchesRequest (Rounds, Categories, TimesHrs, TimesMins);
            if (Maked) {
                MakingTimes.classList.remove("active");
                MakingTimes.classList.remove("highlighted");
                ProcessSuccess = document.querySelector(".process-success");
                SuccessP = document.querySelector(".process-success p");
                SuccessP.innerHTML = "Matches generated successfully";
                ProcessSuccess.classList.add("active");
                ProcessSuccess.classList.add("highlighted");    
                MakingTimes.classList.remove("active");
                MakingTimes.classList.remove("highlighted-1");
            } else {
                ProcessFailed.classList.add("highlighted");
                ProcessFailed.classList.add("active");
                MakingTimes.classList.remove("active");
                MakingTimes.classList.remove("highlighted-1");
            }
        }

    })

}

//Handle Edit Results 
async function editResults (AddOrDelete) {
    let EditResults = document.querySelector(".editing-results");
    let WinsInput = document.querySelector(".wins");
    let LosesInput = document.querySelector(".loses");
    let TiesInput = document.querySelector(".ties");
    let Submit = document.querySelector(".edit-result-submit");
    let Edited;

    let ProcessFailed = document.querySelector(".process-falied");
    let ProcessSuccess = document.querySelector(".process-success");
    let SuccessP = document.querySelector(".process-success p");


    EditResults.classList.add("active");
    EditResults.classList.add("higlighted-1");
    WinsInput.value = 0;
    LosesInput.value = 0;
    TiesInput.value = 0;

    Submit.addEventListener("click", async () => {
        if (AddOrDelete == "add")
            Edited = await addResultsRequest(WinsInput.value, LosesInput.value, TiesInput.value, localStorage.getItem("team_id"));
        else 
            Edited = await deleteResultsRequest(WinsInput.value, LosesInput.value, TiesInput.value, localStorage.getItem("team_id"));
        await makingTableRequest();
        EditResults.classList.remove("active");
        EditResults.classList.remove("highlighted");
        if ( Edited) {
            ProcessSuccess = document.querySelector(".process-success");
            SuccessP = document.querySelector(".process-success p");
            SuccessP.innerHTML = "Results edited successfully";
            ProcessSuccess.classList.add("active");
            ProcessSuccess.classList.add("highlighted");
            EditResults.classList.remove("active");
            EditResults.classList.remove("highlighted-1");
        } else {
            ProcessFailed.classList.add("highlighted");
            ProcessFailed.classList.add("active");
            EditResults.classList.remove("active");
            EditResults.classList.remove("highlighted-1");
        }
    })
}

//Handle Adding Match 
async function addingMatch () {
    let AddMatch = document.querySelector(".adding-match");
    let HomeSelect = document.querySelector(".adding-match .home");
    let AwaySelect = document.querySelector(".adding-match .away");

    let DayInput = document.querySelector(".day-input");
    let MonthInput;
    let YearInput;
    let Days;
    let DayDataList;
    let DayOption;
    let Day;
    let Month;

    let HrsInput = document.querySelector(".hrs");
    let MinsInput = document.querySelector(".mins");

    let Teams = await fetchTeamsInLeague();
    let Option;

    let Added;

    let ProcessFailed = document.querySelector(".process-falied");
    let ProcessSuccess = document.querySelector(".process-success");
    let SuccessP = document.querySelector(".process-success p");
    let DimOverlay = document.querySelector(".dim-overlay");

    let Submit = document.querySelector(".adding-match .submit");

    AddMatch.classList.add("active");
    AddMatch.classList.add("highlighted");
    DimOverlay.classList.add("dim");

    Days = 30;
    DayDataList = document.querySelector("#day");
    DayDataList.innerHTML = "";
    for ( let i = 1; i <= Days; i++) {
        DayOption = document.createElement("option");
        DayOption.value = i;
        DayOption.innerHTML = i;
        DayDataList.append(DayOption);
    }

    MonthInput = document.querySelector(".month-input");
    YearInput = document.querySelector(".year-input");
    MonthInput.addEventListener("input", UpdateDays);
    YearInput.addEventListener("input",  UpdateDays);

    Teams.forEach(team => {
        Option = document.createElement("option");
        Option.value = team.id;
        Option.innerHTML = team.name;
        HomeSelect.append(Option);
        Option = document.createElement("option");
        Option.value = team.id;
        Option.innerHTML = team.name;
        AwaySelect.append(Option);
    })

    Submit.addEventListener("click", async () => {
        Day = DayInput.value.padStart(2, "0");
        Month = MonthInput.value.padStart(2, "0");
        Added = await addingMatchRequest(HomeSelect.value, AwaySelect.value, YearInput.value, Month, Day, HrsInput.value, MinsInput.value);   
        console.log(Added);
        if (Added[0] && Added[1]) {
            ProcessSuccess = document.querySelector(".process-success");
            SuccessP = document.querySelector(".process-success p");
            SuccessP.innerHTML = "Match added successfully";
            ProcessSuccess.classList.add("active");
            ProcessSuccess.classList.add("highlighted");
            AddMatch.classList.remove("active");
            AddMatch.classList.remove("highlighted-1");
        } else {
            ProcessFailed.classList.add("highlighted");
            ProcessFailed.classList.add("active");
            AddMatch.classList.remove("active");
            AddMatch.classList.remove("highlighted-1");
        }
    })

}

//Handle Deleting Match
async function deletingMatch () {
    let DeleteMatch = document.querySelector(".deleting-match");
    let MatchesSelect = document.querySelector(".deleting-match .match");
    let Option;
    let Submit = document.querySelector(".deleting-match .submit");
    let Matches = await fetchMatchesByRound();

    let ProcessFailed = document.querySelector(".process-falied");
    let ProcessSuccess = document.querySelector(".process-success");
    let SuccessP = document.querySelector(".process-success p");
    let FailedP = document.querySelector(".process-falied p");
    let DimOverlay = document.querySelector(".dim-overlay");

    let Deleted;

    DimOverlay.classList.add("dim");
    if (Matches.length !== 0) {
        DeleteMatch.classList.add("active");
        DeleteMatch.classList.add("highlighted-1");
    } else {
        FailedP.innerHTML = "No special mathces";
        ProcessFailed.classList.add("highlighted");
        ProcessFailed.classList.add("active");
        AddMatch.classList.remove("active");
        AddMatch.classList.remove("highlighted-1");
    }

    Matches.forEach((match) => {
        Option = document.createElement("option");
        Option.value = match.id;
        Option.innerHTML = `${match.homeTeam.name} Vs ${match.awayTeam.name}`;
        MatchesSelect.append(Option);
    })

    Submit.addEventListener("click", async() => {
        DeleteMatch.classList.remove("active");
        DeleteMatch.classList.remove("highlighted-1");
        Deleted = await deletingMatchRequest(MatchesSelect.value);
        if (Deleted && Matches.length !== 0) {
            ProcessSuccess = document.querySelector(".process-success");
            SuccessP = document.querySelector(".process-success p");
            SuccessP.innerHTML = "Match deleted successfully";
            ProcessSuccess.classList.add("active");
            ProcessSuccess.classList.add("highlighted");
            AddMatch.classList.remove("active");
            AddMatch.classList.remove("highlighted-1");
        } else {
            ProcessFailed.classList.add("highlighted");
            ProcessFailed.classList.add("active");
            AddMatch.classList.remove("active");
            AddMatch.classList.remove("highlighted-1");
        }
    })

}

//Handle Days To Monthes
function UpdateDays () {
    let MonthInput = document.querySelector(".month-input");
    let YearInput = document.querySelector(".year-input");
    let Days = 30;
    let DayDataList;
    let DayOption;

    if (MonthInput.value !== "")
        Days = ManageDays(parseInt(MonthInput.value), parseInt(YearInput.value));
    DayDataList = document.querySelector("#day");
    DayDataList.innerHTML = "";

    for ( let i = 1; i <= Days; i++) {
        DayOption = document.createElement("option");
        DayOption.value = i;
        DayOption.innerHTML = i;
        DayDataList.append(DayOption);
    }
}

function ManageDays (Month, Year) {
    let Days;
    if ( Month == 4 || Month == 6 || Month == 9 || Month == 11)
        Days = 30;
    else if (Month == 2)
        if (Year !== null) 
            if (IsLeapYear(Year))
                Days = 29;
            else
                Days = 28;
        else
            Days = 28;
    else 
        Days = 31;
    return Days;
}

//Handle Leap Year
function IsLeapYear (year) {
    if (year % 400 == 0)
        return true;
    else if (year % 100 == 0)
        return false;
    else if (year % 4 == 0)
        return true;
    else
        return false;
}

//Handle Active Team Selection 
function handleActiveTeam (CurrentIndex, TeamsLis) {
    TeamsLis.forEach((Li) => {Li.classList.remove("active")});
        let activeItem = TeamsLis[CurrentIndex];
        activeItem.classList.add("active");
        activeItem.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
    });
}

Main();