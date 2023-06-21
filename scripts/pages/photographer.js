import { getPhotographerMediaById, getPhotographerById } from "../api/API.js"
import { DOMElement, photographerName, photographerCity, photographerTagline } from "../components/DomElement.js"
import { photographerPicture, photographerPortrait,} from "../components/Portrait.js"
import { mediasLikesCounter, totalLikesCounter } from "../utils/likesCounter.js"


// get the photographer's id from the url
function getPhotographerID() {
    const findPhotographerID = (new URL(document.location)).searchParams
    return findPhotographerID.get('id')
}

export const photographerJsonId = +getPhotographerID()
if (!photographerJsonId) {
    window.location.href="./index.html"
}


async function retrivalData() {
    const photographer = await getPhotographerById(photographerJsonId) 
    getPhotographerPageHeaderDOM(photographer)
    
    const photographersMedias = await getPhotographerMediaById(photographerJsonId)
    getPhotographerMedias(photographersMedias)
}
retrivalData()


function getPhotographerPageHeaderDOM (photographer) {
    const { name, id, city, country, tagline, price, portrait } = photographer
    const photographHeaderContainer = document.querySelector('.photographHeader_container')
    const photographHeaderLeft = photographHeaderContainer.querySelector('.left')
    const photographHeaderRight = photographHeaderContainer.querySelector('.right')
    const photographContactButton = document.getElementById('photograph_contact_button_position')
    const pricePerDay = document.querySelector('.overlay_bottomRight_pricePerDay')
    
    // Photographer name
    const photographerName_payload = photographerName(photographer)
    photographerName_payload.classNames = photographerName_payload.classNames.concat(' ', 'page_name')
    DOMElement(photographerName_payload, photographHeaderLeft)
    
    
    //Photographer city & country
    const photographerCity_payload = photographerCity(photographer)
    photographerCity_payload.classNames = photographerCity_payload.classNames.concat(' ', 'page_city')
    DOMElement(photographerCity_payload, photographHeaderLeft)
    
    //Photographer tagline
    
    const photographerTagline_payload = photographerTagline(photographer)
    photographerTagline_payload.classNames = photographerTagline_payload.classNames.concat(' ', 'page_Tagline')
    DOMElement(photographerTagline_payload, photographHeaderLeft)
    
    
    //Photographer img portrait
    const imgContainer = document.createElement('div')
    imgContainer.classList.add('photographer_portrait_container')
    
    const picture = photographerPicture(photographer)
    photographerPortrait(photographer, picture, imgContainer)
    
    photographHeaderRight.appendChild(imgContainer)
    
    //Photographer contact button
    photographContactButton.classList.add('photograph_contact_button_position')
    
    // Photographer pricePerDay in overlay
    pricePerDay.textContent = `${price}\u20AC / jour`
    
    return { name, id, city, country, tagline, price, portrait, getPhotographerPageHeaderDOM }
}

const arrayOfPhotographerMedias = []

function getPhotographerMedias(photographersMedias) {
    photographersMedias.forEach(photographerMedias => {
        arrayOfPhotographerMedias.push(photographerMedias)
        // getKeyAndValue(photographerMedias) // DEV (end of page ===>  pages/photographers.js)
    });
    getPhotographerPageMediasDOM(arrayOfPhotographerMedias)
}


export function getPhotographerPageMediasDOM(data){ 
    
    data.forEach(el => {
        const { image, video, title, likes, photographerId } = el
        const photographer_medias_section = document.querySelector('.photographer_medias_section')
        const article = document.createElement('article')
        const aLink = document.createElement('a')
        const mediaNameAndLikes = document.createElement('div')
        const mediaName = document.createElement('span')
        const mediaLikes = document.createElement('span')
        const mediaLikesCounter = document.createElement('span')
        const heartIcon = document.createElement('i')
        
        article.classList.add('photographer_media_container')
        photographer_medias_section.appendChild(article)
        
        if (image) { 
            const img = document.createElement('img') 
            img.classList.add('media')
            img.setAttribute('src', `./assets/images/${photographerId}/${image}`)
            aLink.appendChild(img)  
            aLink.setAttribute('href', '#')
            article.appendChild(aLink)
        }
    
        if (video) { 
            const removeVideoExt = video.split(".")[0] //for video poster 
            
            const video_container = document.createElement('video') 
            const videoMedia = document.createElement('source')
            
            video_container.classList.add('media')
            video_container.setAttribute('controls', "controls")
            video_container.setAttribute('preload', "metadata")
            video_container.setAttribute('poster', `/assets/images/${photographerId}/${removeVideoExt}.jpg`)
            video_container.appendChild(videoMedia)
            
            aLink.appendChild(video_container)  
            aLink.setAttribute('href', '#')
            article.appendChild(aLink)
            
            videoMedia.setAttribute('src', `./assets/images/${photographerId}/${video}`)
            videoMedia.setAttribute('type', 'video/mp4')
        }   
    
        mediaNameAndLikes.classList.add('medias')
        mediaName.classList.add('medias_name')
        mediaLikes.classList.add('medias_likes_container')
        mediaLikesCounter.classList.add('medias_likes_counter')
        heartIcon.classList.add('fa-solid', 'fa-heart')
        heartIcon.classList.add('heartButton')
        mediaName.textContent = `${title}`
        mediaLikesCounter.textContent = `${likes}`
        
        article.appendChild(mediaNameAndLikes)
        mediaNameAndLikes.appendChild(mediaName)
        mediaNameAndLikes.appendChild(mediaLikes)
        mediaLikes.appendChild(mediaLikesCounter)
        mediaLikes.appendChild(heartIcon)
    })
    mediasLikesCounter()
    totalLikesCounter()
}




// //DEV START
// const arrayOfPhotographerMediasKeyValue = []
// function getKeyAndValue(photographerMedias, arrayOfPhotographerMediasKeyValue) {
//     Object.entries(photographerMedias).forEach(([key, value]) => {
//         arrayOfPhotographerMediasKeyValue.push({key, value})
//     });
// }

// //DEV END



