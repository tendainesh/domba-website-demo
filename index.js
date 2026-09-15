const availabilityForm = document.getElementById("availabilityForm");
const availabilityStatus = document.getElementById("availabilityStatus");
const contactForm = document.getElementById("contact");
const messageField = document.getElementById("cntmsg");

availabilityForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const property = document.getElementById("property").value;
  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;
  const adults = document.getElementById("adults").value;
  const children = document.getElementById("children").value;

  if (!checkIn || !checkOut) {
    showStatus(availabilityStatus, "Please choose both check-in and check-out dates.", false);
    return;
  }

  if (new Date(checkOut) <= new Date(checkIn)) {
    showStatus(availabilityStatus, "Check-out must be after check-in.", false);
    return;
  }

  messageField.value = [
    `Property: ${property}`,
    `Check-in: ${checkIn}`,
    `Check-out: ${checkOut}`,
    `Adults: ${adults}`,
    `Children: ${children}`,
    `Submitted: ${new Date().toLocaleString("en-ZM", { timeZone: "Africa/Harare" })}`,
  ].join("\n");

  showStatus(availabilityStatus, "Dates received. Review the message below to complete your inquiry.", true);
  contactForm?.scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".newsletter-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = new FormData(form).get("email");
    const status = form.nextElementSibling;

    localStorage.setItem("dombaNewsletterEmail", email);
    form.reset();
    showStatus(status, "Thanks for subscribing. We will keep you updated.", true);
  });
});

function showStatus(element, message, success) {
  if (!element) return;

  element.textContent = message;
  element.classList.toggle("text-green-700", success);
  element.classList.toggle("text-red-700", !success);
}
