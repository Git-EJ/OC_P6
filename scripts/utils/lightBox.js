// import { photographerCity } from "../components/DomElement"

// #region - init lightbox html
    const lightBox = document.querySelector('.lightbox') // lightbox = lb
    const lbModal = document.querySelector('.lightbox_modal')
    const lbBefore = document.querySelector('.lightbox_modal_before')
    const lbAfter = document.querySelector('.lightbox_modal_after')

    const lbImg = document.createElement('img')
    lbImg.setAttribute("data-type", 'image')
    lbImg.classList.add('lightbox_modal_media', "hidden")

    const lbVideo = document.createElement('video')
    lbVideo.setAttribute('controls', "controls")
    lbVideo.setAttribute('preload', "metadata")
    lbVideo.setAttribute('type', 'video/mp4')
    lbVideo.setAttribute("data-type", 'video')
    lbVideo.classList.add('lightbox_modal_media', "hidden")

    const lbTitle = document.querySelector('.lightbox_modal_title')
    console.log(lbTitle);

    lbModal.appendChild(lbImg)
    lbModal.appendChild(lbVideo)
// #endregion

let medias = []
let lbCurrentMediaIndex = null

const setCurrentMedia = (index) => {

    // const currentMedia = medias[index].content
    const currentMediaTitle = medias[index].title
    const currentMediaType = medias[index].type
    const currentMediaPhotographerId = medias[index].photographerID
    const currentMediaName = medias[index].name
    
    if (currentMediaType === 'image') {
        lbImg.setAttribute('src', `/assets/images/${currentMediaPhotographerId}/${currentMediaName}`)
        lbImg.classList.remove("hidden")
        lbVideo.classList.add("hidden")

    } else if (currentMediaType === 'video') {
        lbVideo.setAttribute('src', `/assets/images/${currentMediaPhotographerId}/${currentMediaName}`)
        const removeVideoExt = currentMediaName.split(".")[0]
        lbVideo.setAttribute('poster', `/assets/images/${currentMediaPhotographerId}/${removeVideoExt}.jpg`);
        lbVideo.classList.remove("hidden")
        lbImg.classList.add("hidden")
    }
    lbTitle.textContent =`${currentMediaTitle}`
}

const onBefore = () => {
    lbCurrentMediaIndex = (lbCurrentMediaIndex-1 + medias.length) % medias.length
    setCurrentMedia(lbCurrentMediaIndex)
}

const onAfter = () => {
    lbCurrentMediaIndex = (lbCurrentMediaIndex+1) % medias.length
    setCurrentMedia(lbCurrentMediaIndex)
}

function onSelect (e) {
    let elem = e.target
    const media_index = elem.getAttribute("media_index")
    lbCurrentMediaIndex = +media_index
    setCurrentMedia(lbCurrentMediaIndex)
}

const setLightboxMedias = (m) => {
    // remove old listeners
    medias.forEach(m => m.removeEventListener("click", onSelect))
    lbBefore.removeEventListener('click', onBefore)
    lbAfter.removeEventListener('click', onAfter)

    // set current media array
    medias = m
    lbCurrentMediaIndex = 0

    // add new listeners
    medias.forEach((m,i) => {
        m.content.setAttribute("media_index", i)
        m.content.addEventListener('click', onSelect)
    })
    lbBefore.addEventListener('click', onBefore)
    lbAfter.addEventListener('click', onAfter)
}


const displayLightBox = () => {lightBox.style.display = 'flex'}
const closeLightBox = () => {lightBox.style.display = 'none'}
document.addEventListener('keydown', (e) => {e.key === 'Escape' ?  closeLightBox() : ''})
