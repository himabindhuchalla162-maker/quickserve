const searchButton = document.querySelector(".search-btn");

searchButton.addEventListener("click", function () {

    const location = document.querySelector(
        '.search-item:nth-child(1) input'
    ).value;

    const service = document.querySelector(
        '.search-item:nth-child(2) input'
    ).value;

    if (location === "" || service === "") {
        alert("Please enter your location and service.");
        return;
    }

    alert(
        "Searching for " +
        service +
        " services near " +
        location +
        "..."
    );
});


// Login button
const loginButton = document.querySelector(".login-btn");

loginButton.addEventListener("click", function () {
    alert("Login page will be available soon!");
});


// Join as Worker button
const joinButton = document.querySelector(".join-btn");

joinButton.addEventListener("click", function () {
    alert("Worker registration page will be available soon!");
});


// Find a Worker button
const workerButton = document.querySelector(".cta-btn");

workerButton.addEventListener("click", function () {
    document.querySelector("#services").scrollIntoView({
        behavior: "smooth"
    });
});


// Service cards
const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const serviceName = card.querySelector("h3").textContent;

        alert(
            serviceName +
            " service selected!"
        );

    });

});