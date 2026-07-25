//Fetches
async function fetchPlayersByTeam (team_id) {
    const res = await fetch(`http://localhost:8080/admin/getPlayersByTeam/${team_id}`);
    const Players = await res.json();
    return Players;
}

//Adding Player Data 
async function Main () {

    localStorage.setItem("deleteAcc", "");
    localStorage.setItem("edit", "");
    let Team_id = localStorage.getItem("team_id");
    let Players = await fetchPlayersByTeam(Team_id);

    let PlayerListDiv = document.querySelector(".players-list");
    let PlayerList = document.querySelector(".players");
    let PlayersNum = localStorage.getItem("players_num");
    let PlayersListButton = document.querySelector(".P-List");
    let PlayersListClose =  document.querySelector(".players-list .X");

    let PlayerNameP;
    let MainPlayer;

    let DayInput;
    let MonthInput;
    let YearInput;
    let NameInput;
    let NatioInput;
    let PosInput;
    let NumberInput;
    let Birthdate;
    let monthes;
    let month;
    let day;

    let PlayersLis;
    let InputsIDs;
    let PlayerLi;
    let IDsInput;

    let DimOverlay = document.querySelector(".dim-overlay");

    Players.sort((a, b) => a.id - b.id);

    MainPlayer = Players.find(p => p.id == parseInt(localStorage.getItem("player_id"))) || null;

    for ( let i = 0; i < PlayersNum; i++) {
        PlayerLi = document.createElement("li");
        PlayerLi.classList.add("player");
        IDsInput = document.createElement("input");
        IDsInput.classList.add("id");
        IDsInput.classList.add("hiddin");
        IDsInput.type = "text";
        if ( i < Players.length) {
            PlayerLi.innerHTML = Players[i].name;
            IDsInput.value = Players[i].id;
        }
        else {
            IDsInput.value = `Player ${i + 1}`;
            PlayerLi.innerHTML = `Player ${i + 1}`;
        }
        PlayerLi.append(IDsInput);
        PlayerList.append(PlayerLi);
    }

    PlayerNameP = document.querySelector(".player-name");
    if (MainPlayer !== null) {
        DayInput = document.querySelector(".day-input");
        MonthInput = document.querySelector(".month-input");
        YearInput = document.querySelector(".year-input");
        NameInput = document.querySelector(".name-input");
        NatioInput = document.querySelector(".natio-input");
        PosInput = document.querySelector(".pos-input");
        NumberInput = document.querySelector(".num-input");    

        Birthdate = MainPlayer.birthdate;
        let [daystr, monthStr, year] = Birthdate.split("-");
        monthes = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        month = monthes.indexOf(monthStr);
        day = parseInt(daystr);

        PlayerNameP.innerHTML = MainPlayer.name;
        DayInput.value = day;
        MonthInput.value = month + 1;
        YearInput.value = year;
        NameInput.value = MainPlayer.name;
        NatioInput.value = MainPlayer.natio;
        PosInput.value = MainPlayer.pos;
        NumberInput.value = MainPlayer.num;
    } else {
        PlayerNameP.innerHTML = localStorage.getItem("player_id");
    }

    PlayersListButton.addEventListener("click", () => {
        PlayerListDiv.classList.add("active");
        PlayerListDiv.classList.add("highlighted");
        DimOverlay.classList.add("dim");
    })

    PlayersListClose.addEventListener("click", () => {
        PlayerListDiv.classList.remove("active");
        PlayerListDiv.classList.remove("highlighted");
        DimOverlay.classList.remove("dim");
    })

    PlayersLis = document.querySelectorAll(".player");
    InputsIDs = document.querySelectorAll(".id");
    PlayersLis.forEach((Li, index) => {
        Li.addEventListener("click", () => {
            localStorage.setItem("player_id", InputsIDs[index].value);
            document.location.reload();
        })
    })

}

Main();