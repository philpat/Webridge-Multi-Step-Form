"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const steps = ["form", "plan", "add-ons", "check-up", "thank-you"];
  const stepButtons = document.querySelectorAll("#step-btn");
  const form = document.getElementById("form-fill");
  const nextButtons = document.querySelectorAll("#nxt-btn");
  const prevButtons = document.querySelectorAll("#prv-btn");

  let currentStep = 0;

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      document
        .getElementById(step)
        .classList.toggle("hidden", index !== stepIndex);
    });

    // Update step buttons
    stepButtons.forEach((button, index) => {
      button.classList.toggle("bg-blue-900", index <= stepIndex);
      button.classList.toggle("border-light-blue", index <= stepIndex);
    });
  }

  function validateStep(stepIndex) {
    switch (stepIndex) {
      case 0:
        return validatePersonalInfo();
      case 1:
        return validatePlanSelection();
      case 2:
      // return validateAddOns();
      case 3:
        return true;
      default:
        return false;
    }
  }
  function validatePlanSelection() {
    const selectedPlan = document.querySelector("#plan");
    if (!selectedPlan) {
      return false;
    } else {
      return true;
    }
  }
  function validatePersonalInfo() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const error = document.getElementById("error");
    const emailError = document.getElementById("email-error");

    if (!name || !email || !phone) {
      error.style.display = "block";
      return false;
    }

    if (!validateEmail(email)) {
      emailError.style.display = "block";
      return false;
    }

    return true;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  document
    .getElementById("pricingToggle")
    .addEventListener("change", function () {
      const initPrice = document.getElementById("init-price");
      if (this.checked) {
        // Yearly pricing
        initPrice.textContent = "₦50,000";
      } else {
        // Monthly pricing
        initPrice.textContent = "₦5,000";
      }
    });

  function handleNextStep(event) {
    event.preventDefault();
    if (validateStep(currentStep)) {
      currentStep++;
      showStep(currentStep);
    }
  }

  function handlePreviousStep(event) {
    event.preventDefault();
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  }

  // Event Listeners
  nextButtons.forEach((button) => {
    button.addEventListener("click", handleNextStep);
  });

  prevButtons.forEach((button) => {
    button.addEventListener("click", handlePreviousStep);
  });

  showStep(currentStep);
});
