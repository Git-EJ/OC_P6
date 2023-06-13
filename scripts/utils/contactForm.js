const modal = document.getElementById("contact_modal");
const allFields = document.querySelectorAll('input, textarea')
const inputFields = document.querySelectorAll('input')
const textareaField = document.querySelector('textarea')
const lastnameField = document.getElementById('lastname')
const firstnameField = document.getElementById('firstname')
const emailField = document.getElementById('email')


const displayModal = () => {modal.style.display = "block"}

const closeModal = () => {modal.style.display = "none"}
document.addEventListener('keydown', (e) => {e.key === 'Escape' ?  closeModal() : ''})



// START ALL FIELDS 

// Check if fields are empty
//before user entry
//after user entry
allFields.forEach(emptyField => {
    emptyField.value ==="" ? emptyField.setCustomValidity('Veuillez renseigner ce champ') : emptyField.setCustomValidity('')
    
    emptyField.addEventListener('input', () => {
        emptyField.value ==="" ? emptyField.setCustomValidity('Veuillez renseigner ce champ') : emptyField.setCustomValidity('')
    })
})  
//END of Check if fields are empty 



//No space at the beginning or at the end of the fields
/**
 * @param {*DOM Element} inputField (input field for modal contact form)
*/
function noSpaceBeginningAndEnd(inputFields) {
    let timeout;
    inputFields.forEach(inputField => {
        inputField.addEventListener('input', (e) => {
            clearTimeout(timeout) //cancel the previous setTimeout
            timeout = setTimeout(() => {
                const trimmedValue = inputField.value.trim();
                inputField.value !== trimmedValue //without like an infinite loop of dispatchEvent
                ? (inputField.value = trimmedValue, inputField.dispatchEvent(new Event('input')))
                :''
            }, 1000);
        });
    });
}
noSpaceBeginningAndEnd(allFields)
// END off No space at the beginning or at the end of the fields



// Validity States:
// Allowed characters (regex)
// Minimum length
inputFields.forEach((inputField) => {
    inputField.addEventListener('input', (e) => {
        console.log(`${inputField.name}`, inputField.value)           // SOUTENANCE 
        if(e.target.validity.tooShort) { 
            e.target.setCustomValidity('Veuillez saisir au minimum 2 caratères')
            e.stopPropagation()
        } else if(inputField.type != 'email' && e.target.validity.patternMismatch) {
            e.target.setCustomValidity('Caractères non Autorisés')
            e.stopPropagation()
        } else {
            e.target.setCustomValidity('')
        }
    })
})

textareaField.addEventListener('input', (e) => {
    console.log(`${textareaField.name}`, textareaField.value)        // SOUTENANCE                        
    e.target.validity.tooShort ? (e.target.setCustomValidity('Veuillez saisir au minimum 20 caractères')) : e.target.setCustomValidity('')
})
//END of Validity States
//END OF ALL FIELDS


// FIRSTNAME NAME AND LASTNAME FIELDS
/**
 * @param {*DOM Element} inputField (input field for modal contact form)
 */
function only1Dash(inputField) {
    inputField.addEventListener('input', (e) => {
        let value = e.target.value
        let newValue = value.replace('--', '-').replace('  ', ' ')
        value.length != newValue.length ? e.target.value = newValue : ''
    })
}

/**
 * @param {*DOM Element} inputField (input field for modal contact form)
*/
function noDashFirstAndLast (inputField) {
    inputField.addEventListener('input', (e) => {
        inputField.value.startsWith('-') || inputField.value.endsWith('-')
        ? (inputField.setCustomValidity("Pas de trait d'union au début ou à la fin de ce champ"), e.stopPropagation())
        : ''
    })
}


only1Dash(firstnameField)
only1Dash(lastnameField)
noDashFirstAndLast(firstnameField)
noDashFirstAndLast(lastnameField)
// END FIRSTNAME NAME AND LASTNAME FIELDS



// START OF EMAIL FIELD

//space can't be enter even if it's press
emailField.addEventListener('keydown', (e) => {e.key === ' ' ? e.preventDefault() : '' })

// END OF EMAIL FIELD





 
//DEV START

//modal automatic spawn
// displayModal();

//DEV END