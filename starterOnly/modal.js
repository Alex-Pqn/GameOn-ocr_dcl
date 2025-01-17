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

// launch signup modal
function launchSignupModal() {
  resetValidation()
  modalSignup.style.display = "block";
}
// close signup modal
function closeSignupModal() {
  modalSignup.style.display = "none";
}
// launch thanks modal
function launchThanksModal() {
  modalThanks.style.display = "block";
}
// close thanks modal
function closeThanksModal() {
  modalThanks.style.display = "none";
}


// FORM VALIDATION
// validate all the fields and send the form
// on error, display custom error on each field

const formSignup = document.getElementById('form-signup')
let models
let validationFailed

// prevent the default event to refresh the page on form submit 
formSignup.addEventListener('submit', (e) => {
  e.preventDefault()
})

// on signup form submit
function formSubmit () {
  resetValidation()
  
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
      value: birthdate,
      errorContainer: '#birthdate-err',
      type: {
        value: 'string',
        error: `La valeur entrée est incorrecte.`
      },
      minCaracters: {
        value: 10,
        error: `La date de naissance entrée est incorrecte.`
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
      errorContainer: '#checkbox-err',
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
      errorContainer: '#checkbox-err',
      type: {
        value: 'boolean',
        error: `La valeur des newsletters est incorrecte.`
      },
    }
  ]
  
  // push allowed locations strings
  // allowed locations strings are retrieved in the form
  locations.forEach(location => { 
    const locationsArray = models[5].allowedStrings.value
    locationsArray.push(location.value)
    if (location.checked) models[5].value = location.value
  })
  
  formValidation()
}

// form validation
// foreach the models array with each value to validate
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

// validation functions
const minCaracters = (min, string) => string.length >= min
const regex = (regex, string) => regex.test(string)
const type = (type, string) => typeof(string) === type
const booleanChecked = (checked, boolean) => checked === boolean

/**
 * Compare array of strings with a string
 * @param {array} stringsArray
 * @param {string} string
 * @returns 
 */
function allowedStrings (stringsArray, string) {
  let validate = false
  stringsArray.forEach(s => { 
    if (s === string) validate = true
  })
  if (validate) return true
  return false
}

// send form
// close signup modal, reset form and launch the thanks modal
function sendForm () {
  closeSignupModal()
  resetForm()
  launchThanksModal()
}

// reset validation fields
function resetValidation () {
  validationFailed = false
  document.querySelectorAll('.formError').forEach(e => {
    e.textContent = ''
  })
}
// reset form fields
function resetForm () {
  formSignup.reset()
}
// handle errors
function handleErr (DOMElement, err) {
  validationFailed = true
  document.querySelector(DOMElement).textContent = `${err}`
}