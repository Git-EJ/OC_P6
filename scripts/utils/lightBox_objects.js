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
    const mediaTitle = medias[index].title
    const mediaType = medias[index].type
    const mediaUrl = medias[index].url
    
    if (mediaType === 'image') {
        lbImg.setAttribute('src', mediaUrl)
        lbImg.classList.remove("hidden")
        lbVideo.classList.add("hidden")
        lbVideo.setAttribute("src", '')
    } else if (mediaType === 'video') {
        lbVideo.setAttribute('src', mediaUrl)
        const removeVideoExt = mediaUrl.split(".")[0]
        lbVideo.setAttribute('poster', `${removeVideoExt}.jpg`);
        lbVideo.classList.remove("hidden")
        lbImg.classList.add("hidden")
    }
    lbTitle.textContent =`${mediaTitle}`
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
    medias.forEach(m => m.content.removeEventListener("click", onSelect))
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
