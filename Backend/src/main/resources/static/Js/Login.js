let ProcessFailed = document.querySelector(".process-falied");
let ProcessSuccess = document.querySelector(".process-success");
let ProcessFailedOk = document.querySelector(".process-falied button");
let DimOverlay = document.querySelector(".dim-overlay");

document.querySelector(".login-form .container").addEventListener("submit", async function(e){
    e.preventDefault();

    const formData = new FormData(this);

    const response = await fetch("https://footballmanagementsystem-production-27eb.up.railway.app/Login", {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: {
            "Accept": "application/json"
        }
    });

    if (response.ok) {
        window.location.href = "https://footballmanagementsystem-production-27eb.up.railway.app/Dashboard.html";
    } else {
        DimOverlay.classList.add("dim");
        ProcessFailed.classList.add("active");
        ProcessFailed.classList.add("highlighted");
    }
});


//POP-UPs
ProcessFailedOk.addEventListener("click", () => {
    ProcessFailed.classList.remove("active");
    ProcessFailed.classList.remove("highliughted");
    DimOverlay.classList.remove("dim");
})
