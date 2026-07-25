

//Fetches
async function fetchTeams (Team_Id) {
    const res = await fetch(`http://localhost:8080/getTeam/${Team_Id}`);
    const Team = await res.json();
    return Team;
}

//Edit Data 
async function newPlayerDataRequest (Num, Name, Year, Month, Day, Natio, Team_id, Pos) {
    const res = await fetch(`http://localhost:8080/admin/addPlayer/${Num}/${Name}/${Year}-${Month}-${Day}/${Natio}/${Team_id}/${Pos}`, {
        method: "PUT"
    })
    return res.ok;
} 

async function editingPlayerDataRequest(Player_id, Num, Name, Year, Month, Day, Natio, Team_id, Pos) {
    const res = await fetch(`http://localhost:8080/admin/editPlayerData/${Player_id}/${Num}/${Name}/${Year}-${Month}-${Day}/${Natio}/${Team_id}/${Pos}`, {
        method: "POST"
    });
    return res.ok;
} 

//Handle Player Data
async function Main() {

    localStorage.setItem("deleteAcc", "");
    localStorage.setItem("edit", "");
    let Team = await fetchTeams(localStorage.getItem("team_id"))
    let Players = Team.players;

    let AddPlayerDiv = document.querySelector(".add-player .container")
    let PlayerDataDiv = document.createElement("div");
    let Submit = document.querySelector(".add-player .submit");

    let YearDataList;
    let DayDataList;
    let YearOption;
    let DayOption;
    let YearInput;
    let MonthInput;
    let Days;

    let ProcessStatus;
    let ProcessStatusOk;

    PlayerDataDiv.classList.add("player-data")
    PlayerDataDiv.innerHTML = `
            <label class="name-label">
                Name: 
                <input type="text" placeholder="Name" class="name-input">
            </label>
            <label class="birthdate-label">
                Birthdate:
                    <input type="text" list="year" class="year-input" placeholder="Year">
                    <datalist id="year"></datalist>
                <input type="text" list="month" class="month-input" placeholder="Month">
                <datalist id="month">
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </datalist>
                <input type="text" list="day" class="day-input" placeholder="Day">
                <datalist id="day"></datalist>
            </label>
            <label class="natio-label">
                Nationality:
                <input type="text" list="natio" class="natio-input" placeholder="Select or search country">
                <datalist id="natio">
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Brunei">Brunei</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Greece">Greece</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran">Iran</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Libya">Libya</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palestine">Palestine</option>
                    <option value="Panama">Panama</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russia</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syria</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                </datalist>
            </label>
            <label class="Team-label">
                Team:
                <input type="text" disabled value="${Team.name}">
            </label>
            <label class="Pos-label">
                Position:
                <input type="text" list="pos" class="pos-input" placeholder="Position">
                <datalist id="pos">
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Defender">Defender</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Forward">Forward</option>
                </datalist>
            </label>
            <label class="num-label">
                Number:
                <input type="text" class="num-input" placeholder="Number">
            </label>
        `

        AddPlayerDiv.append(PlayerDataDiv);
        YearDataList = document.querySelector("#year");
        for ( let i = 1900; i< 2026; i++) {
            YearOption = document.createElement("option");
            YearOption.value = i;
            YearOption.innerHTML = i;
            YearDataList.append(YearOption);
        }

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
        ProcessStatus = document.querySelectorAll(".process-status");
        ProcessStatusOk = document.querySelectorAll(".process-status button");
        ProcessStatusOk.forEach((Ok) => {
        Ok.addEventListener("click", () => {
            ProcessStatus.forEach((Status) => {
                    if (Status.classList.contains("process-success") && Status.classList.contains("active"))
                        handleNextPlayer();
                    else {
                        Status.classList.remove("active");
                        let DimOverlay = document.querySelector(".dim-overlay");
                        DimOverlay.classList.remove("dim");
                    }
                })
            })
        })
        Submit.addEventListener("click", () => submitingData(Players, Team));
}

//Handle Submiting Data
async function submitingData (Players, Team) {
    let MainPlayer = Players.find(p => p.id == parseInt(localStorage.getItem("player_id"))) || null;
    let Player_id;

    let DayInput = document.querySelector(".day-input");
    let MonthInput = document.querySelector(".month-input");
    let YearInput = document.querySelector(".year-input");
    let NameInput = document.querySelector(".name-input");
    let NatioInput = document.querySelector(".natio-input");
    let PosInput = document.querySelector(".pos-input");
    let NumberInput = document.querySelector(".num-input");
    let CountriesOptions = document.querySelectorAll(".natio-label option");
    let Countires = [];

    let Day = DayInput.value.padStart(2, "0");
    let Month = MonthInput.value.padStart(2, "0");

    let DimOverlay = document.querySelector(".dim-overlay");

    let ProcessSuccess;
    let ProcessFailed;
    let SuccessP;

    let Sended;

    for ( let i = 0; i < CountriesOptions.length; i++) {
        Countires[i] = CountriesOptions[i].value;
    }

    if ( parseInt(YearInput.value) < 2026 && parseInt(Month) > 0 && parseInt(Month) < 13 && parseInt(Day) > 0 && parseInt(Day) < 32 && Countires.includes(NatioInput.value)) {
        if (!MainPlayer) {
            Sended = await newPlayerDataRequest(NumberInput.value, NameInput.value, YearInput.value, Month, Day, NatioInput.value, Team.id, PosInput.value);
        } else {
            Player_id = parseInt(localStorage.getItem("player_id"));
            Sended = await editingPlayerDataRequest(Player_id, NumberInput.value, NameInput.value, YearInput.value, Month, Day, NatioInput.value, Team.id, PosInput.value);
        }
    }

    if (Sended) {
        ProcessSuccess = document.querySelector(".process-success");
        SuccessP = document.querySelector(".process-success p");
        SuccessP.innerHTML = "Player added successfully";
        ProcessSuccess.classList.add("active");
        DimOverlay.classList.add("dim");
        ProcessSuccess.classList.add("highlighted");
    } else {
        ProcessFailed = document.querySelector(".process-falied");
        ProcessFailed.classList.add("highlighted");
        ProcessFailed.classList.add("active");
        DimOverlay.classList.add("dim");
    }
}

//Handle Next Player 
function handleNextPlayer () {
    let InputsIDs = document.querySelectorAll(".id");
    let Matching;
    if (InputsIDs.length == 0)
        location.href = "Settings.html";
    else {
        for ( let  i = 0 ; i < InputsIDs.length; i++) {
            Matching = InputsIDs[i].value.match (/^Player (\d+)$/);
            if (Matching) {
                localStorage.setItem("player_id", InputsIDs[i + 1].value);
                document.location.reload();
                break;
            } else {
                document.location.href = "Settings.html";
            }
        }
    }
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

Main();