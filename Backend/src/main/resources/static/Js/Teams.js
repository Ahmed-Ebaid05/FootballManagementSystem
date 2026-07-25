//Fetches
async function fetchTeams () {
    const res = await fetch(`http://localhost:8080/getTeamsInLeague`);
    const Teams = await res.json();
    return Teams;
}

async function fetchTeamById (TeamId) {
    const res = await fetch(`http://localhost:8080/getTeam/${TeamId}`)
    const Team = await res.json();
    return Team;
}

//Display Teams
async function Main() {

    localStorage.setItem("deleteAcc", "");
    localStorage.setItem("edit", "");

    let mainContainer = document.querySelector(".teams .container");
    let Teams = await fetchTeams();
    let box;
    let TeamsBoxes;
    Teams.forEach((team) => {
        box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
            <div class="image">
            <p>${team.name}</p>
                <img src="data:image/png;base64,${team.logo}" alt="">
            </div>
            <div class="bords">
                <div class="bord1"></div>
                <div class="bord2"></div>
            </div>
            <div class="text">
                <p>${team.slogan}</p>
            </div>
        `;
        mainContainer.append(box);
    })
    TeamsBoxes = document.querySelectorAll(".container .box");
    TeamsBoxes.forEach((box, index) => {
        box.addEventListener("click", () => selectingTeam(Teams[index].id));
    })

}

//Handle Team Selection 
async function selectingTeam (team_id) {

    let Team = await fetchTeamById(team_id);
    let TeamContainer = document.querySelector(".team .container");
    let mainContainer = document.querySelector(".teams .container");
    let TeamName = document.querySelector(".landing .text h2");
    let TeamSlogan = document.querySelector(".landing .text p");
    let Players;
    let PlayerDiv;
    let goalkeepers;
    let defenders;
    let midfielders;
    let forwards;

    TeamName.innerHTML = Team.name;
    TeamSlogan.innerHTML = Team.slogan;
    mainContainer.innerHTML = ``;
    TeamContainer.innerHTML = `
        <div class="info">
            <div class="image">
                <img src="data:image/png;base64,${Team.logo}" alt="">
                <p class="name">${Team.name}</p>
            </div>
            <dic class="text">
                <p>Coach: ${Team.coach}</p>
                <p>Since: ${Team.foundation_year}</p>
                <p>Stadium: ${Team.stadium}</p>
            </div>
        </div>
        <h2>Goalkeepers</h2>
        <div class="goalkeepers">
        </div>
        <h2>Defenders</h2>
        <div class="defenders">
        </div>
        <h2>Midfielders</h2>
        <div class="midfielders">
        </div>
        <h2>Forwards</h2>
        <div class="forwards">
        </div>
    `;

    Players = Team.players;

    goalkeepers = document.querySelector(".goalkeepers");
    defenders = document.querySelector(".defenders");
    midfielders = document.querySelector(".midfielders");
    forwards = document.querySelector(".forwards");

    Players.forEach((player) => {
    PlayerDiv = document.createElement("div");
    PlayerDiv.classList.add("player");
    PlayerDiv.innerHTML = `
        <div class="image">
            <img src="Flags/Flag_of_${player.natio}_Flat_Round-512x512.png" alt="">
            <p>${player.num}</p>
        </div>
        <div class="text">
            <h4>${player.name} </h4>
            <p>Nationality: <span>${player.natio}</span></p>
            <p>Birthdate: <span>${player.birthdate}</span></p>
        </div>
    `
    if (player.pos == "Goalkeeper") 
        goalkeepers.append(PlayerDiv);
    else if (player.pos == "Defender")
        defenders.append(PlayerDiv);
    else if (player.pos == "Midfielder") 
        midfielders.append(PlayerDiv);
    else if (player.pos == "Forward") 
        forwards.append(PlayerDiv);
    })

    window.scrollTo({
        top: 0,
    });

    back.classList.add("active");
    back.addEventListener("click", () => {
        document.location.reload();
    })

}

Main();