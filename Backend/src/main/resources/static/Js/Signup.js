//Fetches
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
async function editUserRequest(formData) {
    const res = await fetch("http://localhost:8080/editUser", {
        method: "POST",
        body: formData
    });
    return [res.ok, await res.text()];
}

async function addUserRequest(formData) {
    const res = await fetch("http://localhost:8080/addUser", {
        method: "PUT",
        body: formData
    });
    return [res.ok, await res.text()];
}

async function Main () {

    let Account;

    let Birthdate;

    let Days;
    let DayOption;
    let YearDataList = document.querySelector("#year");
    let YearOption;

    let DayInput = document.querySelector(".day-input");
    let MonthInput = document.querySelector(".month-input");
    let YearInput = document.querySelector(".year-input");
    let FirstNameInput = document.querySelector(".firstName");
    let LastNameInput = document.querySelector(".lastName");
    let EmailInput = document.querySelector(".email");
    let UsernameInput = document.querySelector(".username");
    let PasswordLabel = document.querySelectorAll(".password-label");
    let ProfilePicLabel = document.querySelector(".pic-label");

    let ProcessStatus = document.querySelectorAll(".process-status");
    let ProcessStatusOk = document.querySelectorAll(".process-status button");

    let Submit = document.querySelector(".submit");

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

    if (localStorage.getItem("edit") == "edit" ) {
        Account = await fetchAccount();
        Birthdate = Account.birthdate;
        MonthInput = document.querySelector(".month-input");
        YearInput = document.querySelector(".year-input");
        MonthInput.addEventListener("input", UpdateDays);
        YearInput.addEventListener("input",  UpdateDays);

        let [year, month, day] = Birthdate.split("-");

        DayInput.value = day;
        MonthInput.value = month;
        YearInput.value = year;
        FirstNameInput.value = Account.firstName;
        LastNameInput.value = Account.lastName;
        UsernameInput.value = Account.username;
        EmailInput.value = Account.email;

        EmailInput.disabled = true;
        PasswordLabel.forEach((Label) => {Label.style.display = "none";})
        ProfilePicLabel.style.display = "none";
    }

    Submit.addEventListener("click", () => submitingData());

    //POP-UPs
    ProcessStatusOk.forEach((Ok) => {
        Ok.addEventListener("click", () => {
            ProcessStatus.forEach((Status) => {
                if (Status.classList.contains("process-success") && Status.classList.contains("active")) {
                    Status.classList.remove("active");
                    localStorage.setItem("edit", "");
                    document.location.href = "index.html";
                }
                else {
                    Status.classList.remove("active");
                    let DimOverlay = document.querySelector(".dim-overlay");
                    DimOverlay.classList.remove("dim");
                }
            })
        })
    })
}

//Handle Submiting Data
async function submitingData () {

    let DayInput = document.querySelector(".day-input");
    let MonthInput = document.querySelector(".month-input");
    let YearInput = document.querySelector(".year-input");
    let FirstNameInput = document.querySelector(".firstName");
    let LastNameInput = document.querySelector(".lastName");
    let EmailInput = document.querySelector(".email");
    let PasswordInput = document.querySelector(".password");
    let ConfirmPasswordinput = document.querySelector(".confirm-password");
    let UsernameInput = document.querySelector(".username");
    let ProfilePicInput = document.querySelector(".signup .profile-pic");

    let Day = DayInput.value.padStart(2, "0");
    let Month = MonthInput.value.padStart(2, "0");

    let DimOverlay = document.querySelector(".dim-overlay");

    let ProcessSuccess = document.querySelector(".process-success");
    let SuccessP = document.querySelector(".process-success p");
    let ProcessFailed = document.querySelector(".process-falied");
    let FailedP = document.querySelector(".process-falied p");

    let Sended = [];

    let Profile;

    let formData = new FormData();
    formData.append("firstName", FirstNameInput.value);
    formData.append("lastName", LastNameInput.value);
    formData.append("username", UsernameInput.value);
    formData.append("email", EmailInput.value);
    formData.append("password", PasswordInput.value);
    formData.append("birthdate", `${YearInput.value}-${Month}-${Day}`);

    FailedP.innerHTML = "";

    FailedP.innerHTML = "Process Failed";
        if (localStorage.getItem("edit") == "edit") {
            Sended = await editUserRequest(formData);
        } else {
            if (PasswordInput.value !== ConfirmPasswordinput.value) {
                Sended = [false, "The passwords are not matching"];
                FailedP.innerHTML = "The passwords are not matching";
            } else if (!checkPassword(PasswordInput.value)) {
                Sended = [false, "The password is weak"];
                FailedP.innerHTML = "The password is weak";
            } else {
                Profile = ProfilePicInput.files[0] || null;
                if (Profile)
                    formData.append("pic", Profile);
                Sended = await addUserRequest(formData);
            }
        }

    if (Sended[0]) {
        if (localStorage.getItem("edit") == "edit")
            SuccessP.innerHTML = "Data editted successfully";
        else
            SuccessP.innerHTML = "Account has made successfully";
        ProcessSuccess.classList.add("active");
        DimOverlay.classList.add("dim");
        ProcessSuccess.classList.add("highlighted");
    } else if (Sended[1].includes("Username")) {
        FailedP.innerHTML = "User name already exists";
        ProcessFailed.classList.add("highlighted");
        ProcessFailed.classList.add("active");
        DimOverlay.classList.add("dim");
    } else if (Sended[1].includes("Email")) {
        FailedP.innerHTML = "Email already exists";
        ProcessFailed.classList.add("highlighted");
        ProcessFailed.classList.add("active");
        DimOverlay.classList.add("dim");
    } else {
        ProcessFailed.classList.add("highlighted");
        ProcessFailed.classList.add("active");
        DimOverlay.classList.add("dim");
    }
}

//Handle Password
function checkPassword (Password) {
    let Lowercase = Array.from({length: 26}, (_, i) => String.fromCharCode(97 + i));
    let Uppercase = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
    let Number = Array.from({length: 10}, (_, i) => i.toString());
    let SpecialChars = [
        ...Array.from({length: 15}, (_,i)=>String.fromCharCode(33+i)),
        ...Array.from({length: 7}, (_,i)=>String.fromCharCode(58+i)),
        ...Array.from({length: 6}, (_,i)=>String.fromCharCode(91+i)),
        ...Array.from({length: 4}, (_,i)=>String.fromCharCode(123+i))
    ];

    let ContainsSpecial = SpecialChars.some(char => Password.includes(char));
    let ContainsUpper = Uppercase.some(char => Password.includes(char));
    let ContainsLower = Lowercase.some(char => Password.includes(char));
    let ContainNumber = Number.some(char => Password.includes(char));

    if (ContainNumber && ContainsLower && ContainsSpecial && ContainsUpper) {
        console.log(true);
        return true;
    }
    else {
        console.log(false);
        return false;
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