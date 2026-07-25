//Edit Data
async function addNewTeamRequest (formData) {
    const res = await fetch(`http://localhost:8080/admin/addNewTeam`,{
            method: "PUT",
            body: formData
        });
    return [res.ok, await res.json()];
}

async function getTeams () {
    const res = await fetch(`http://localhost:8080/admin/getAllTeams`);
    const Teams = await res.json();
    return Teams;
}

//Handle Team Data 
async function Main () {

    localStorage.setItem("deleteAcc", "");
    localStorage.setItem("edit", "");

    let YearsDataList = document.querySelector("#years");

    for (let i = 2026 ; i > 0; i--) {
        let Option = document.createElement("option");
        Option.innerHTML = i;
        Option.value = i;
        YearsDataList.append(Option);
    }

    let NameInput = document.querySelector(".name");
    let FoundationYearInput = document.querySelector(".foundation-year");
    let SloganInput = document.querySelector(".slogan");
    let CoachInput = document.querySelector(".coach");
    let PlayersNumber = document.querySelector(".players-num");
    let StadiumInput = document.querySelector(".stadium");
    let LogoInput = document.querySelector(".team-logo");

    let DimOverlay = document.querySelector(".dim-overlay");
    let ProcessFailed = document.querySelector(".process-falied");
    let ProcessStatus = document.querySelectorAll(".process-status");
    let ProcessStatusP = document.querySelectorAll(".process-status p");
    let ProcessStatusOk = document.querySelectorAll(".process-status button");
    let Submit = document.querySelector(".submit");

    let Logo;
    let formData;

    let TeamAdded;
    let Teams = await getTeams();
    let ValidName = true;

    Submit.addEventListener("click", async () => {
        for ( let i = 0 ; i < Teams.length; i++) 
            if (Teams[i].name == NameInput.value) {
                ValidName = false;
                console.log(NameInput.value);
                break;
            } else {
                ValidName = true;
            }
        console.log(ValidName);
        if (ValidName && PlayersNumber >= 11) {
            Logo = LogoInput.files[0] || null;
            formData = new FormData();
            formData.append("name", NameInput.value);
            formData.append("foundation_year", FoundationYearInput.value);
            formData.append("coach", CoachInput.value);
            formData.append("stadium", StadiumInput.value);
            formData.append("slogan", SloganInput.value);
            formData.append("in_league", 2);
            formData.append("ranking", 1);
            formData.append("logo", Logo);
            TeamAdded = await addNewTeamRequest(formData);
            if (TeamAdded[0]) {
                localStorage.setItem("players_num", PlayersNumber.value);
                localStorage.setItem("player_id", "Player 1");
                localStorage.setItem("team_id", TeamAdded[1]);
                document.location.href = "AddingNewTeamPlayers.html";
            } else {
                DimOverlay.classList.add("dim");
                ProcessFailed.classList.add("highlighted");
                ProcessFailed.classList.add("active");            
            }
        } else {
            DimOverlay.classList.add("dim");
            ProcessStatusP.innerHTML = "Process falied: The team name is taken";
            ProcessFailed.classList.add("highlighted");
            ProcessFailed.classList.add("active");            
        }
    })

    ProcessStatusOk.forEach((Ok) => {
        Ok.addEventListener("click", () => {
            ProcessStatus.forEach((Status) => {
                Status.classList.remove("active");
                DimOverlay.classList.remove("dim");
            })
        })
    })

}

Main();