// Global Error Gestion

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".btnClose")


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.forEach((btn) => btn.addEventListener('click', closeModal));

// launch modal form
function launchModal() {
 document.body.style.overflowY = "hidden"; // Disable Body Scrollbar
  if(document.body.clientWidth >= 768){
    modalbg.style.display = "block";
  } else {
    modalbg.style.display = "flex";
  }
  
}

// close modal form
function closeModal(){
  document.body.style.overflowY = "scroll"; // Enable body Scrollbar
  modalbg.style.display = 'none';
}

// Regex
let regexEmail =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
let regexfirstName = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/
let regexlastName =  /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/

// OnSubmit Form Verification

function validate(event) {
  event.preventDefault();

  // Counter required fields
  var count = 0; 

  // Clear Error Divs
  let errorDivs = document.querySelectorAll('.error')
  errorDivs.forEach((item) => item.replaceChildren())

  // Form Input DOM
  const firstName = event.currentTarget.first
  const lastName = event.currentTarget.last
  const email = event.currentTarget.email
  const quantity = event.currentTarget.quantity
  const birthdate = event.currentTarget.birthdate
  const radioCheckBox = event.currentTarget.querySelectorAll('.checkbox-input[name="location"]')
  const cguCheckbox = event.currentTarget.checkbox1;
  const radioChecked = [];
  const requiredFields = event.currentTarget.querySelectorAll('.required')


  // FirstName Length & Regex Verification

  if(firstName.value.length < 2){
      let error = document.getElementsByClassName('firstNameError')
      let msg = document.createTextNode('Le prènom doit contenir au minimum 2 charactères.')
      error[0].appendChild(msg)
      count--
      firstName.style.border = '1px solid red'
  } else if (firstName.value.match(regexfirstName)){
      firstName.style.border = 'none'
      count++
  } else {
      let error = document.getElementsByClassName('firstNameError')
      let msg = document.createTextNode(`Le format du prènom n'est pas valide.`)
      error[0].appendChild(msg)
      count--
  }

  // LastName Lenght & Regex Verification
  if(lastName.value.length < 2){
    let error = document.getElementsByClassName('lastNameError')
    let msg = document.createTextNode('Le nom doit contenir au minimum 2 charactères.')
    error[0].appendChild(msg)
    count--
    lastName.style.border = '1px solid red'
  } else if(lastName.value.match(regexlastName)) {
    count++
    lastName.style.border = 'none'
  } else {
    let error = document.getElementsByClassName('lastNameError')
    let msg = document.createTextNode(`Le format du nom n'est pas valide.`)
    error[0].appendChild(msg)
    count--
  }


  // Email Regex Verification
  if(!email.value.match(regexEmail)){
    let error = document.getElementsByClassName('emailError')
    if(email.value < 1){
      email.style.border = '1px solid red'
      var msg = document.createTextNode('Le champs ne peut être vide.')
    } else {
      email.style.border = '1px solid red'
      var msg = document.createTextNode(`Format de l'email non valide.`)
    }
    error[0].appendChild(msg)
    count--
  } else {
    count++
    email.style.border = 'none'
  }


  // Birthdate Empty/Not empty
  if(!birthdate.value){
    let error = document.getElementsByClassName('birthdateError')
    let msg = document.createTextNode('Veuillez entrer une date de naissance.')
    error[0].appendChild(msg)
    count--
    birthdate.style.border = '1px solid red'
  } else {
    count++
    email.style.border = 'none'
  }


  // Cup Quantity Value Verification
  if(!quantity.value){
    let error = document.getElementsByClassName('quantityError')
    let msg = document.createTextNode('Le champs ne peut être vide.')
    error[0].appendChild(msg)
    count--
    quantity.style.border = '1px solid red'
  } else if(isNaN(quantity.value)) {
    let error = document.getElementsByClassName('quantityError')
    let msg = document.createTextNode('Le champs doit être obligatoirement un nombre.')
    error[0].appendChild(msg)
    count--
    quantity.style.border = '1px solid red'
  } else {
    count++
    email.style.border = 'none'
  }


  // Checkbox Verification
  radioCheckBox.forEach((checkbox) => {
    if(checkbox.checked === true){
      radioChecked.push(checkbox)
    }
  })

  if(radioChecked.length < 1){
    let error = document.getElementsByClassName('locationError')
    let msg = document.createTextNode('Veuillez séléctionner un choix.')
    error[0].appendChild(msg)
  }

  // CGu Checkbox Verification
  if(cguCheckbox.checked !== true){
    let error = document.getElementsByClassName('cguError')
    let msg = document.createTextNode('Vous devez accepter les cgu')
    error[0].appendChild(msg)
  }

  // Confirm Form is not errors
  if(count >= requiredFields.length && radioChecked.length > 0 && cguCheckbox.checked === true){
    let form = document.querySelector('form')
    let formParent = form.parentElement
    form.remove();
    formParent.innerHTML = '<div class="successfully"><span style="padding: 50px">Merci ! Votre réservation a été reçue.</span> <div class="closeButton btn-submit btnClose" onClick="closeModal()">Fermer</div></div>'
  }
}
