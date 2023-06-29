 // import { photographerCity } from "../components/DomElement"

export class Lightbox {

    constructor() {
        this.medias = []
        this.map = new Map()
        this.index = -1

        this.buildElements()
        this.extractElements()

        this.init()
    }

    buildElements () {
        const body = document.body
        const div = document.createElement('div')
        
        this.container = div
        this.container.classList.add("lightbox")
        this.wrapper = document.createElement("div")
        this.wrapper.classList.add("lightbox_modal")
        this.wrapper.setAttribute('role', 'dialog') 
        this.wrapper.setAttribute('aria-label', 'media closeup view')
        this.wrapper.innerHTML = `
            <svg class="lightbox_modal_close" viewBox="0 0 384 512" role="button"  aria-label="closeup dialog"
                alt="icone de fermeture lightBox media" aria-label="icone de fermeture carrousel photos et videos">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 
                            105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 
                            12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 
                            45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>

            <svg class="lightbox_modal_before" viewBox="0 0 320 512" alt="icone media precedent lightBox media  role="link"  aria-label="va à l'image précédente"
                aria-label="icone media precedent lightBox media">
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 
                            0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>

            <svg class="lightbox_modal_after" viewBox="0 0 320 512" alt="icone media suivant lightBox media"  role="link"  aria-label="va à l'image suivante"
                aria-label="icone media suivant lightBox media">
                <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 
                            12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 
                            0-45.3s32.8-12.5 45.3 0l160 160z" />
            </svg>`
        this.container.style.display = "none"
        body.appendChild(div)
    }
 
    extractElements() {
        
        this.closeBtn = this.wrapper.querySelector('.lightbox_modal_close')
        this.beforeBtn = this.wrapper.querySelector('.lightbox_modal_before')
        this.afterBtn = this.wrapper.querySelector('.lightbox_modal_after')
        
        this.imageElement = document.createElement('img')
        this.imageElement.classList.add('lightbox_modal_media', "hidden")
        this.imageElement.setAttribute("data-type", 'image')
        this.imageElement.setAttribute("role", 'image') 
        
        this.videoElement = document.createElement('video')
        this.videoElement.classList.add('lightbox_modal_media', "hidden")
        this.videoElement.setAttribute('controls', "controls")
        this.videoElement.setAttribute('preload', "metadata")
        this.videoElement.setAttribute('type', 'video/mp4')
        this.videoElement.setAttribute("data-type", 'video')
        this.videoElement.setAttribute("role", 'video')
        
        this.titleElement = document.createElement("div")     
        this.titleElement.classList.add("lightbox_modal_title")
        this.titleElement.setAttribute('role', 'text')

        this.wrapper.appendChild(this.imageElement)
        this.wrapper.appendChild(this.videoElement)
        this.wrapper.appendChild(this.titleElement)

        this.container.appendChild(this.wrapper)
    }

    init() {
        this.keyEscapeListener = (e) => {
            if (e.key === "Escape") {
                this.onClose()
            }
        }

        this.onClickOut = (e)=>{
            if (e.target === this.container) {
                this.onClose()
            }
        }

        this.onClose = () => {
            this.container.style.display = "none"
        }

        this.onOpen = () => {
            this.container.style.display = "flex"
        }
        
        const that = this

        this.onBefore = () => {
            that.index = (that.index-1 + that.medias.length) % that.medias.length
            that.updateMedia()
        }

        this.onAfter = () => {
            that.index = (that.index+1) % that.medias.length
            that.updateMedia()
        }

        this.onSelect = (e) => {
            let elem = e.target
            const media_index = +that.map.get(elem)
            that.index = media_index
            that.updateMedia()
        }
    }

    updateMedia () {
        const index = this.index
        if (index<0) return

        // const currentMedia = medias[index].content
        const mediaTitle = this.medias[index].title
        const mediaType = this.medias[index].type
        const mediaUrl = this.medias[index].url
        const mediaAriaLabel = this.medias[index].ariaLabel
     
        if (mediaType === 'image') {
            this.imageElement.setAttribute('src', mediaUrl)
            this.imageElement.setAttribute("aria-label", `${mediaAriaLabel}`) 
            this.imageElement.classList.remove("hidden")
            this.videoElement.classList.add("hidden")
            

        } else if (mediaType === 'video') {
            this.videoElement.setAttribute('src', mediaUrl)
            this.videoElement.setAttribute("aria-label", `${mediaAriaLabel}`) 
            const removeVideoExt = mediaUrl.split(".").slice(0, -1).join('.')
            this.videoElement.setAttribute('poster', `${removeVideoExt}.jpg`);
            this.videoElement.classList.remove("hidden")
            this.imageElement.classList.add("hidden")
        }
        this.titleElement.textContent =`${mediaTitle}`

        this.onOpen()
    }

    addListeners () {
        this.container.addEventListener("click", this.onClickOut)
        this.closeBtn.addEventListener("click", this.onClose)
        this.container.addEventListener("keydown",this.keyEscapeListener )
        this.medias.forEach((m,i) => {
            this.map.set(m.content, i)
            m.content.addEventListener("click", this.onSelect)
        })
        this.beforeBtn.addEventListener("click", this.onBefore)
        this.afterBtn.addEventListener("click", this.onAfter)
    }

    removeListeners() {
        this.container.removeEventListener("click", this.onClickOut)
        this.closeBtn.removeEventListener("click", this.onClose)
        this.container.removeEventListener("keydown",this.keyEscapeListener )
        this.medias.map(m=>m.content.removeEventListener("click", this.onSelect))
        this.beforeBtn.removeListener("click", this.onBefore)
        this.afterBtn.removeListener("click", this.onAfter)
    }

    open (medias) {
        this.medias = medias
        console.log(this.medias);
        this.index = this.medias.length>0 ? 0 : -1
        this.addListeners()
    }

    close () {
        this.onClose()

        this.removeListeners()
        this.map.clear()
        this.medias = []
    }
    
}
