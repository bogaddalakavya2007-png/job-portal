```javascript
// Kavya Job Portal - Contact Page

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        formMessage.textContent = "Please fill in all fields.";
        return;
    }

    // Demo only: no email is actually sent.
    formMessage.textContent =
        "Thank you, " + name +
        "! Your form has been checked successfully. " +
        "This demo does not send messages to an email address.";

    contactForm.reset();
});
```