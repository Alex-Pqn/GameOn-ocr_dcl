function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalSignup = document.getElementById('modal-signup')
const modalThanks = document.getElementById('modal-thanks')
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalSignupClose = document.querySelectorAll('.modal-signup-close')
const modalThanksClose = document.querySelectorAll('.modal-thanks-close')

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchSignupModal));
modalSignupClose.forEach((btn) => btn.addEventListener("click", closeSignupModal));
modalThanksClose.forEach((btn) => btn.addEventListener("click", closeThanksModal));

// launch modal form
function launchSignupModal() {
  modalSignup.style.display = "block";
}
function closeSignupModal() {
  modalSignup.style.display = "none";
}
function closeThanksModal() {
  modalThanks.style.display = "none";
}

