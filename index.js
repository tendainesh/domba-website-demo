document.addEventListener("DOMContentLoaded", () => {
  const availabilityForm = document.getElementById("availabilityForm");
  const availabilityStatus = document.getElementById("availabilityStatus");
  const checkIn = document.getElementById("checkIn");
  const checkOut = document.getElementById("checkOut");

  if (availabilityForm && availabilityStatus && checkIn && checkOut) {
    const today = new Date().toISOString().split("T")[0];
    checkIn.min = today;
    checkOut.min = today;

    checkIn.addEventListener("change", () => {
      checkOut.min = checkIn.value || today;
    });

    availabilityForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!checkIn.value || !checkOut.value) {
        availabilityStatus.textContent = "Please select both check-in and check-out dates.";
        availabilityStatus.className = "mt-4 text-sm text-red-600";
        return;
      }

      if (checkOut.value <= checkIn.value) {
        availabilityStatus.textContent = "Check-out must be after check-in.";
        availabilityStatus.className = "mt-4 text-sm text-red-600";
        return;
      }

      availabilityStatus.textContent = "Thanks. We will confirm availability with you shortly.";
      availabilityStatus.className = "mt-4 text-sm text-green-700";
    });
  }

  document.querySelectorAll(".newsletter-form").forEach((form) => {
    const status = form.parentElement?.querySelector(".newsletter-status");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (status) {
        status.textContent = "Thanks for subscribing to our newsletter.";
        status.className = "newsletter-status mt-2 text-sm text-green-700";
      }

      form.reset();
    });
  });
});
