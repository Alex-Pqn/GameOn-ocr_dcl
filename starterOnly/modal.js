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
function launchThanksodal() {
  modalThanks.style.display = "block";
}
function closeThanksModal() {
  modalThanks.style.display = "none";
}

const formSignup = document.getElementById('form-signup')
let models
let validationFailed

// VALIDATION
formSignup.addEventListener('submit', (e) => {
  e.preventDefault()
  validationFailed = false
  
  const firstname = document.reserveForm.firstname.value
  const lastname = document.reserveForm.lastname.value
  const email = document.reserveForm.email.value
  const birthdate = document.reserveForm.birthdate.value
  const eventQuantity = document.reserveForm.eventQuantity.value
  const locations = document.reserveForm.elements.location
  const cguBoolean = document.reserveForm.checkboxCgu.checked
  const newslettersBoolean = document.reserveForm.checkboxNewsletters.checked
  
  models = [
    {
      value: firstname,
      errorContainer: '#firstname-err',
      minCaracters: {
        value: 2,
        error: `Votre prénom doit contenir au minimum 2 caractères.`
      },
      type: {
        value: 'string',
        error: `La valeur entrée est incorrecte.`
      },
    },
    {
      value: lastname,
      errorContainer: '#lastname-err',
      minCaracters: {
        value: 2,
        error: `Votre nom doit contenir au minimum 2 caractères.`
      },
      type: {
        value: 'string',
        error: `La valeur entrée est incorrecte.`
      },
    },
    {
      value: email,
      errorContainer: '#email-err',
      regex: {
        value: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
        error: `La syntaxe de votre e-mail est invalide.`
      },
      type: {
        value: 'string',
        error: `La valeur entrée est incorrecte.`
      },
    },
    {
      value: +eventQuantity,
      errorContainer: '#event-quantity-err',
      type: {
        value: 'number',
        error: `Vous devez entrer une valeur numérique.`
      },
    },
    {
      value: '',
      errorContainer: '#location-err',
      allowedStrings: {
        value: [],
        error: `La ville que vous avez choisie ne fait pas partie des propositions.`
      },
      type: {
        value: 'string',
        error: `La valeur entrée est incorrecte.`
      },
    },
    {
      value: cguBoolean,
      errorContainer: '#cgu-err',
      isChecked: {
        value: true,
        error: `Vous devez accepter la case des conditions générales pour continuer.`
      },
      type: {
        value: 'boolean',
        error: `La valeur des conditions générales est incorrecte.`
      },
    },
    {
      value: newslettersBoolean,
      errorContainer: '#newsletters-err',
      type: {
        value: 'boolean',
        error: `La valeur des newsletters est incorrecte.`
      },
    }
  ]
  
  locations.forEach(loc => { 
    const array = models[4].allowedStrings.value
    array.push(loc.value)
    if (loc.checked) models[4].value = loc.value
  })
  
  formValidation()
})

function formValidation () {
  models.forEach(e => {
    if (e.type && !type(e.type.value, e.value)) handleErr(e.errorContainer, e.type.error)
    if (e.regex && !regex(e.regex.value, e.value)) handleErr(e.errorContainer, e.regex.error)
    if (e.minCaracters && !minCaracters(e.minCaracters.value, e.value)) handleErr(e.errorContainer, e.minCaracters.error)
    if (e.allowedStrings && !allowedStrings(e.allowedStrings.value, e.value)) handleErr(e.errorContainer, e.allowedStrings.error)
    if (e.isChecked && !booleanChecked(e.isChecked.value, e.value)) handleErr(e.errorContainer, e.isChecked.error)
  })
  
  if (!validationFailed) sendForm()
}

function sendForm () {
  closeSignupModal()
  launchThanksodal()
}

function minCaracters (min, value) {
  if (value.length >= min) return true
  return false
}
function regex (regex, value) {
  return regex.test(value)
}
function type (type, value) {
  if (typeof(value) === type) return true
  return false
}
function allowedStrings (strings, value) {
  let validate = false
  strings.forEach(s => { 
    if (s === value) validate = true
  })
  if (validate) return true
  return false
}
function booleanChecked (checked, value) {
  if (checked === value) return true
  return false
}
function handleErr (DOM, err) {
  validationFailed = true
}