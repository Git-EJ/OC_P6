export class ContactForm {
    constructor(callbackOnOpen, callbackOnClose) {
        this.extractElements()
        this.buildElements()
        this.init()
        this.callbackOnOpen = callbackOnOpen;
        this.callbackOnClose = callbackOnClose;
    }


    extractElements() {
        this.body = document.querySelector('body')
        this.modal = document.getElementById('contact_modal')
        this.openBtn = document.getElementById('photograph_contact_button')
        this.closeBtn = document.getElementById('contact_form_btn_close')
        this.inputFields = document.querySelectorAll('input')
        this.textareaField = document.querySelector('textarea')
        this.allFields = [...this.inputFields, this.textareaField]
        this.lastAndFirstnameFields = [document.getElementById('lastname'), document.getElementById('firstname')]
        this.emailField = document.getElementById('email')
        this.name = document.querySelector('.photographer_name.page_name').textContent
        this.contactMe = document.querySelector('.modal_form_header_title')
    }


    buildElements() {
        this.modal.setAttribute("aria-label", `Contact me ${this.name}`)
        this.contactMe.innerHTML = 'Contactez-moi<br>' + this.name  
    }


    init() {

        this.keyEscapeListener = (e) => { 
            if (e.key === "Escape") { 
                this.onClose() 
            } 
        }
        
        this.keyEnterAndSpace = (e) => {
            if (e.code==="Enter" || e.code==="Space") {
                e.preventDefault()
                this.onClose()
            }
        }

        this.onClickOut = (e) => { 
            if (e.target === this.modal) { 
                this.onClose() 
            } 
        }

        this.onClose = () => { 
            this.modal.style.display = "none" 
            this.callbackOnClose && this.callbackOnClose()
        }

        this.onOpen = () => { 
            this.modal.style.display = "flex" 
            this.modal.focus()
            this.callbackOnOpen && this.callbackOnOpen()
        }
    }


    /**
     * check if fields are empty before user entry
     */
    checkFieldsBeforeEntry() {
        this.allFields.forEach(field => {
            field.value === "" ? field.setCustomValidity('Veuillez renseigner ce champ') : field.setCustomValidity('')
        })
    }

    
    addListeners() {

        //all Fields
        this.allFields.forEach(field => {

            // check if fields are empty
            field.addEventListener('input', () => {
                field.value === "" ? field.setCustomValidity('Veuillez renseigner ce champ') : field.setCustomValidity('')

                //No space at the beginning or at the end of the fields
                clearTimeout(this.timeout) //cancel the previous setTimeout
                this.timeout = setTimeout(() => {
                    const trimmedValue = field.value.trim();
                    field.value !== trimmedValue //without like an "infinite loop" ==>dispatchEvent
                        ? (field.value = trimmedValue, field.dispatchEvent(new Event('input')))
                        : ''
                }, 1000)
            })
        })


        // Only on input Fields
        this.inputFields.forEach(field => {

            // allowed characters (regex) + Minimum length
            field.addEventListener('input', (e) => {
                console.log(`${field.name}`, field.value)           // SOUTENANCE 
                if (e.target.validity.tooShort) {
                    e.target.setCustomValidity('Veuillez saisir au minimum 2 caratères')
                    e.stopPropagation()
                } else if (field.type != 'email' && e.target.validity.patternMismatch) {
                    e.target.setCustomValidity('Caractère(s) non Autorisé(s)')
                    e.stopPropagation()
                } else {
                    e.target.setCustomValidity('')
                }
            })
        })


        //Only on textarea Field
        // Regex 
        // Minimum length
        this.textareaField.addEventListener('input', (e) => {
            console.log(`${this.textareaField.name}`, this.textareaField.value)        // SOUTENANCE
            
            const regex = /^[a-zA-Z0-9\ -_@#,;!%():."=+*/éèà]+$/
            !regex.test(e.target.value) ? e.target.setCustomValidity('Caractère(s) non autorisé(s)') : e.target.setCustomValidity('')
            
            // e.target.validity.tooShort ? e.target.setCustomValidity('Veuillez saisir au minimum 20 caractères') : e.target.setCustomValidity('')
        })


        
        //Only on first and lastname fields
        this.lastAndFirstnameFields.forEach(field => {
            //only one dash 
            field.addEventListener('input', (e) => {
                let value = e.target.value
                let newValue = value.replace('--', '-').replace('  ', ' ')
                value.length != newValue.length ? e.target.value = newValue : ''

                field.value.startsWith('-') || field.value.endsWith('-')
                    ? (field.setCustomValidity("Pas de trait d'union au début ou à la fin de ce champ"), e.stopPropagation())
                    : ''
            })
        })

        //space can't be enter even if it's press
        this.emailField.addEventListener('keydown', (e) => { e.key === ' ' ? e.preventDefault() : '' })


        //open && close modal
        this.openBtn.addEventListener('click', this.onOpen)
        this.closeBtn.addEventListener("click", this.onClose)
        this.closeBtn.addEventListener("keydown", this.keyEnterAndSpace)
        this.modal.addEventListener("keydown", this.keyEscapeListener)
        this.modal.addEventListener("click", this.onClickOut)

    }


    removeListeners() {
        this.allFields.forEach(field => { field.removeEventListener('input', null) })
        this.inputFields.forEach(field => { field.removeEventListener('input', null) })
        this.textareaField.removeEventListener('input', null)
        this.lastAndFirstnameFields.forEach(field => { field.removeEventListener('input', null) })
        this.emailField.removeEventListener('input', null)
        this.openBtn.removeEventListener('click', this.onOpen)
        this.closeBtn.removeEventListener('click', this.onClose)
        this.closeBtn.removeListener("keydown", this.keyEnterAndSpace)
        this.modal.removeEventListener('keydown', this.keyEscapeListener)
        this.modal.removeEventListener('click', this.onClickOut)
    }


    open() {
        this.checkFieldsBeforeEntry()
        this.addListeners()
    }

    close() {
        this.onClose()
        this.removeListeners()
        
    }
}
