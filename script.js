
// Kavya Job Portal - Home Page JavaScript

const searchForm = document.getElementById("searchForm");

if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const keyword = document
            .getElementById("jobKeyword")
            .value.trim();

        const location = document
            .getElementById("jobLocation")
            .value.trim();

        // Check whether the user entered a search
        if (keyword === "" && location === "") {
            alert("Please enter a job title or location!");
            return;
        }

        // Pass search details to the Jobs page
        const params = new URLSearchParams();

        if (keyword !== "") {
            params.set("keyword", keyword);
        }

        if (location !== "") {
            params.set("location", location);
        }

        window.location.href = "jobs.html?" + params.toString();
    });
}
