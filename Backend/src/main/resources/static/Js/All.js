// Main Controles

let tripleBars = document.querySelector(".container .toggole");
let X = document.querySelector(".container .X");
let navUl = document.querySelector("header .container ul");


async function fetchAccount () {
    const res = await fetch(`https://footballmanagementsystem-production-27eb.up.railway.app/currentUser`);
    if (!res.ok)
        return null;
    const text = await res.text();
    if (!text) 
        return null;
    return JSON.parse(text);
}

tripleBars.addEventListener("click", () => {
    navUl.classList.contains("active")? navUl.classList.remove("active") : navUl.classList.add("active");
})

X.addEventListener("click", () => {
    navUl.classList.contains("active")? navUl.classList.remove("active") : navUl.classList.add("active");
})


let Login = document.querySelector(".login");
Login.addEventListener("click", () => {
    document.location.href = "Login.html";
})

let SittsArrow = document.querySelector(".sitts-arrow");
let AccSitts = document.querySelector(".acc-sitts");
SittsArrow.addEventListener("click", () => {
    SittsArrow.classList.toggle("active");
    AccSitts.classList.toggle("active");
})

let SignUp = document.querySelector(".signup");
SignUp.addEventListener("click", () => {
    document.location.href = "Signup.html";
})

let ProfilePic = document.querySelector(".profile-pic");
ProfilePic.addEventListener("click", () => {
    document.location.href = "Dashboard.html";
})

let DeleteAccount = document.querySelector(".delete-account-btn");
DeleteAccount.addEventListener("click", () => {
    localStorage.setItem("deleteAcc", "delete");
    document.location.href = "Dashboard.html";
})

//Handle Logging
async function logging () {
    let SettingsLink = document.querySelector(".settings-li");
    let AccountButtons = document.querySelector("header .btns");
    let ProfileDiv = document.querySelector(".profile");
    let AccountNameP = document.querySelector(".acc-name");
    let ProfilePic = document.querySelector(".profile-pic");
    let Account = await fetchAccount();
    console.log(Account);
    if ( Account !== null) {
        AccountButtons.style.display = "none";
        ProfileDiv.classList.add("active");
        AccountNameP.innerHTML = Account.username;
        if (Account.pic !== null) 
            ProfilePic.src = "data:image/png;base64," + Account.pic;
        if (Account.roles[0] == "admin")
            SettingsLink.classList.add("appear");
    } else {
        SettingsLink.classList.remove("appear");
    }
}

logging();
