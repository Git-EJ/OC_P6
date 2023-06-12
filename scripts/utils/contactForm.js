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
        console.log(inputField.value)
        if(e.target.validity.tooShort) { 
            console.log(e.target);
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
    e.target.validity.tooShort ? (e.target.setCustomValidity('Veuillez saisir au minimum 20 caractères')) : e.target.setCustomValidity('')
})
//END of Validity States
//END OF ALL FIELDS


const form = document.querySelector('form')

form.addEventListener('input', (e) => {
    if(!form.checkValidity()) {
        e.preventDefault();
    }
})

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

// function noSpaceBeginningAndEnd (inputFields) {
//     inputFields.forEach(inputField => {
//         inputField.addEventListener('input', (e) => {
//             setTimeout(() => {
//                 inputField.value = e.target.value.trim()
//                 inputField.dispatchEvent(new Event('input')
//             },1000) 
//         })
//     })
// }

function noSpaceBeginningAndEnd(inputFields) {
    inputFields.forEach(inputField => {
        inputField.addEventListener('input', (e) => {
            const timeout = setTimeout(() => {
                const trimmedValue = inputField.value.trim();
                if (inputField.value !== trimmedValue) {
                    inputField.value = trimmedValue;
                    inputField.dispatchEvent(new Event('input'));
                }
            }, 1000);
            // clearTimeout(timeout)
        });
    });
}
  
only1Dash(firstnameField)
only1Dash(lastnameField)
noDashFirstAndLast(firstnameField)
noDashFirstAndLast(lastnameField)
noSpaceBeginningAndEnd(inputFields)

// END FIRSTNAME NAME AND LASTNAME FIELDS




//DEV START

//modal automatic spawn
displayModal();

//DEV END