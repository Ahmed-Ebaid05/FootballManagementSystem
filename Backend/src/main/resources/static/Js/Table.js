//Fetches
async function fetchTable () {
    const res = await fetch(`http://localhost:8080/getTable/`);
    const TableTeams = await res.json();
    return TableTeams;
}

async function fetchGoalsCount () {
    const res = await fetch(`http://localhost:8080/getTableGoalsCount`);
    const Goals = await res.json();
    return Goals;
}

//Handle Table
async function Main () {
    localStorage.setItem("deleteAcc", "");
    localStorage.setItem("edit", "");

    let TableDiv = document.querySelector(".table .container .table-uls");
    let Teams = await fetchTable();
    let TeamUl;
    let Goals = await fetchGoalsCount();

    for (let i = 0; i < Teams.length; i++) {
        TeamUl = document.createElement("ul");
        TeamUl.classList.add("team");
        TeamUl.innerHTML = `
            <li>${Teams[i].ranking}</li>
            <li>
                <div class="image">
                    <img src="data:image/png;base64,${Teams[i].logo}" alt="">
                </div>
                <p>${Teams[i].name}</p>
            </li>
            <li>${Teams[i].points}</li>
            <li>${Goals[i]}</li>
            <li>${Teams[i].wins}</li>
            <li>${Teams[i].ties}</li>
            <li>${Teams[i].loses}</li>
        `
        TableDiv.append(TeamUl);
    }

}

Main();