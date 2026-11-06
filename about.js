```javascript
// Kavya Job Portal - About Page

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(function (link) {
        if (link.getAttribute("href") === "about.html") {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    console.log("Kavya Job Portal About page loaded.");
});
```