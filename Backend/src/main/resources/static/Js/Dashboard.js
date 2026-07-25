//Fetches
async function fetchAccount () {
    const res = await fetch(`http://localhost:8080/currentUser`);
    if (!res.ok)
        return null;
    const text = await res.json()
    if (!text) 
        return null;
    return text;
}

//Edit Data

async function changeProfilePicRequest(formData) {
    const res = await fetch("http://localhost:8080/changeProfilePic", {
        method: "POST",
        body: formData
    });

    return res.ok;
}

async function deleteAccountRequest (email ,password) {
    const res = await fetch(`http://localhost:8080/deleteAccount/${email}/${password}`, {
        method: "DELETE",
    });
    return res.json();
}

async function Main () {

    let Account = await fetchAccount();

    let UsernameP = document.querySelector(".username");
    let EmailP = document.querySelector(".email");
    let NameP = document.querySelector(".name");
    let birthdateP = document.querySelector(".birthdate");
    let ProfilePic = document.querySelectorAll(".profile-pic");

    let ChangePic = document.querySelector(".change-pic");
    let ChangePicClose = document.querySelector(".change-pic .X");
    let EditButton = document.querySelector(".edit-data");
    let EditPicButton = document.querySelector(".change-pic-button");
    let DeletePic = document.querySelector(".delete-pic-button");
    let SubmitPic = document.querySelector(".submit-pic");

    let DeleteAccDiv = document.querySelector(".delete-account");
    let DeleteAccountButton = document.querySelector(".delete-account-btn");
    let DeleteSubmit = document.querySelector(".submit-del-acc");
    let DeleteAccountClose = document.querySelector(".delete-account .X");

    let ProcessStatus = document.querySelectorAll(".process-status");
    let ProcessStatusOk = document.querySelectorAll(".process-status button");
    let DimOverlay = document.querySelector(".dim-overlay");

    if (Account.pic !== null) 
        ProfilePic.forEach((Pic) => {Pic.src = "data:image/png;base64," + Account.pic;})
    UsernameP.innerHTML = Account.username;
    EmailP.innerHTML = Account.email;
    NameP.innerHTML = `${Account.firstName + " " + Account.lastName}`;
    birthdateP.innerHTML = Account.birthdate;

    //Edit Data
    EditButton.addEventListener("click", () => {
        localStorage.setItem("edit", "edit");
        localStorage.setItem("deleteAcc", "");
        document.location.href = "Signup.html";
    })

    //Edit Or Delete Profile Picture
    EditPicButton.addEventListener("click", () => {
        ChangePic.classList.add("active");
    })

    ChangePicClose.addEventListener("click", () => {
        ChangePic.classList.remove("active");
    })

    SubmitPic.addEventListener("click", async () => {
        changeProfilePicFun(Account);
    })

    DeletePic.addEventListener("click", async () => {
        DeleteProfilePicFun(Account);
    })

    //Delete Account
    if (localStorage.getItem("deleteAcc") == "delete")
        DeleteAccDiv.classList.add("active");

    DeleteAccountButton.addEventListener("click", () => {
        DeleteAccDiv.classList.add("active");
    })

    DeleteAccountClose.addEventListener("click", () => {
        DeleteAccDiv.classList.remove("active");
        localStorage.setItem("deleteAcc", "");
        localStorage.setItem("edit", "");
    })

    DeleteSubmit.addEventListener("click", async () => {
        localStorage.setItem("deleteAcc", "");
        localStorage.setItem("edit", "");
        await deleteAccountFun(Account);
    })

    //POP-UPs
    ProcessStatusOk.forEach((Ok) => {
        Ok.addEventListener("click", () => {
            ProcessStatus.forEach((Status) => {
                if (Status.classList.contains("process-success") && Status.classList.contains("active")) {
                    Status.classList.remove("active");
                    localStorage.setItem("deleteAcc", "");
                    localStorage.setItem("edit", "");
                    document.location.reload();
                }
                else {
                    Status.classList.remove("active");
                    DimOverlay.classList.remove("dim");
                }
            })
        })
    })
}

//Change Profile Picutre
async function changeProfilePicFun (Account) {

    let ProfilePicInput = document.querySelector(".pic-input");
    let Profile = ProfilePicInput.files[0] || null;
    let ProcessSuccess = document.querySelector(".process-success");
    let SuccessP = document.querySelector(".process-success p");
    let ProcessFailed = document.querySelector(".process-falied");
    let FailedP = document.querySelector(".process-falied p");
    let DimOverlay = document.querySelector(".dim-overlay");
    let Changed;

    if (Profile) {
        formData = new FormData();
        formData.append("email", Account.email);
        formData.append("pic", Profile);
        Changed = await changeProfilePicRequest(formData);
        if (Changed) {
            SuccessP.innerHTML = "Process success";
            ProcessSuccess.classList.add("active");
            ProcessSuccess.classList.add("highlighted");
        } else {
            FailedP.innerHTML = "Process failed";
            ProcessFailed.classList.add("active");
            ProcessFailed.classList.add("highlighted");
            DimOverlay.classList.add("dim");
        }
    }
    else {
        FailedP.innerHTML = "No Picture choosed";
        ProcessFailed.classList.add("highlighted");
        ProcessFailed.classList.add("active");
        DimOverlay.classList.add("dim");
    }
}

//Delete Profile Picutre
async function DeleteProfilePicFun (Account) {

    let ProcessSuccess = document.querySelector(".process-success");
    let SuccessP = document.querySelector(".process-success p");
    let ProcessFailed = document.querySelector(".process-falied");
    let FailedP = document.querySelector(".process-falied p");
    let DimOverlay = document.querySelector(".dim-overlay");
    let formData = new FormData();
    let Changed;

    formData.append("email", Account.email);
    Changed = await changeProfilePicRequest(formData);        
    if (Changed) {
        SuccessP.innerHTML = "Process success";
        ProcessSuccess.classList.add("active");
        ProcessSuccess.classList.add("highlighted");
    } else {
        FailedP.innerHTML = "Process failed";
        ProcessFailed.classList.add("active");
        ProcessFailed.classList.add("highlighted");
        DimOverlay.classList.add("dim");
    }
}

//Delete Account
async function deleteAccountFun (Account) {
    let ProcessFailed = document.querySelector(".process-falied");
    let FailedP = document.querySelector(".process-falied p");
    let DimOverlay = document.querySelector(".dim-overlay");
    let PasswordInput = document.querySelector(".delete-account input");
    let deleted = await deleteAccountRequest(Account.email, PasswordInput.value);

    if (deleted) {
        localStorage.setItem("deleteAcc", "");
        localStorage.setItem("edit", "");
        document.location.href = "index.html";
    } else {
        FailedP.innerHTML = "Process failed";
        ProcessFailed.classList.add("active");
        ProcessFailed.classList.add("highlighted");
        DimOverlay.classList.add("dim");
    }
}

Main()
