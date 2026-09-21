
function findService() {
    const input = document.getElementById("serviceSearch");

    if (!input) return;

    const service = input.value.trim().toLowerCase();

    if (service.includes("electric")) {
        window.location.href = "electrician.html";
    } 
    else if (service.includes("plumb")) {
        window.location.href = "plumber.html";
    } 
    else if (service.includes("carpent")) {
        window.location.href = "carpenter.html";
    } 
    else if (service.includes("paint")) {
        window.location.href = "painter.html";
    } 
    else if (service.includes("clean")) {
        window.location.href = "cleaner.html";
    } 
    else if (service.includes("garden")) {
        window.location.href = "gardener.html";
    } 
    else {
        alert("Please enter a valid service.");
    }
}

function logoutUser() {
    localStorage.removeItem("quickserveLoggedIn");
    localStorage.removeItem("quickserveLoggedInUser");
    localStorage.removeItem("quickserveAccountType");

    window.location.href = "index.html";
}

function logoutWorker() {
    localStorage.removeItem("quickserveLoggedIn");
    localStorage.removeItem("quickserveLoggedInUser");
    localStorage.removeItem("quickserveAccountType");

    window.location.href = "index.html";
}

function isLoggedIn() {
    return localStorage.getItem("quickserveLoggedIn") === "true";
}

function getLoggedInUser() {
    return localStorage.getItem("quickserveLoggedInUser") || "";
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("QuickServe JavaScript loaded successfully.");
});