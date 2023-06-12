function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const allFields = document.querySelectorAll('input, textarea')
const inputFields = document.querySelectorAll('input')
const textareaField = document.querySelector('textarea')
const lastnameField = document.getElementById('lastname')
const firstnameField = document.getElementById('firstname')


// ALL FIELDS

// Check if fields are empty
//before user entry
//after user entry
allFields.forEach(emptyField => {
    emptyField.value ==="" ? emptyField.setCustomValidity('Veuillez renseigner ce champ') : emptyField.setCustomValidity('')
    
    emptyField.addEventListener('input', () => {
        emptyField.value ==="" ? emptyField.setCustomValidity('Veuillez renseigner ce champ') : emptyField.setCustomValidity('')
    })
})  
//End of Check if fields are empty 



// Validity States:
// Allowed characters (regex)
// Minimum length

inputFields.forEach((inputField) => {
    inputField.addEventListener('input', (e) => {
        if(e.target.validity.tooShort) { 
            e.target.setCustomValidity('Veuillez saisir au minimum 2 caratères')
            e.stopPropagation()
        } else if(e.target.validity.patternMismatch) {
            e.target.setCustomValidity('Caractères non Autorisés')
            e.stopPropagation() 
        } else {
            e.target.setCustomValidity('')
        }
    })
})

textareaField.addEventListener('input', (e) => {
    e.target.validity.tooShort ? e.target.setCustomValidity('Veuillez saisir au minimum 20 caractères') : e.target.setCustomValidity('')
})


//END of Validity States
//END OF ALL FIELDS




// FIRSTNAME NAME AND LASTNAME FIELDS

/**
 * @param {*DOM Element} inputFieldName (input field for modal contact form)
 */
function only1Dash(inputFieldName) {
    inputFieldName.addEventListener('input', (e) => {
        let name = e.target.value
        let name1 = name.trim()
        let name2 = name1.replace('--', '-')
        name.length !== name2.length ? inputFieldName.value = name2 : ''
    })
}

/**
 * @param {*DOM Element} inputFieldName (input field for modal contact form)
 */
function noDashFirstAndLast (inputFieldName) {
    inputFieldName.addEventListener('input', (e) => {
        if(inputFieldName.value.startsWith('-') || inputFieldName.value.endsWith('-')){
            inputFieldName.setCustomValidity("Pas de trait d'union au début ou à la fin de ce champ")
            e.stopPropagation()
        }
    })
}
    
    
only1Dash(firstnameField)
only1Dash(lastnameField)
noDashFirstAndLast(firstnameField)
noDashFirstAndLast(lastnameField)

// END FIRSTNAME NAME AND LASTNAME FIELDS




//DEV START

//modal automatic spawn
displayModal();

//DEV END