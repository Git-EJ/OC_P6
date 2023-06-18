import { getPhotographerMediaById, getPhotographerById } from "../api/API.js"
import { DOMElement, photographerName, photographerCity, photographerTagline } from "../components/DomElement.js"
// import { photographerMedias } from "../components/Medias.js"
import { photographerPicture, photographerPortrait,} from "../components/Portrait.js"


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
    // console.log(photographer);
    
    const photographersMedias = await getPhotographerMediaById(photographerJsonId)
    getPhotographerMedias(photographersMedias)
    // console.log(photographersMedias)
}
retrivalData()


function getPhotographerPageHeaderDOM (photographer) {
    // console.log(photographer);
    const { name, id, city, country, tagline, price, portrait } = photographer
    const photographHeaderContainer = document.querySelector('.photographHeader_container')
    const photographHeaderLeft = photographHeaderContainer.querySelector('.left')
    const photographHeaderMiddle = photographHeaderContainer.querySelector('.middle')
    const photographHeaderRight = photographHeaderContainer.querySelector('.right')
    const photographContactButton = document.getElementById('photograph_contact_button_position')
    
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

    return { name, id, city, country, tagline, price, portrait, getPhotographerPageHeaderDOM }
}



const arrayOfPhotographerMedias = []
const arrayOfPhotographerMediasKeyValue = []

function getPhotographerMedias(photographersMedias) {
    photographersMedias.map(photographerMedias => {
        arrayOfPhotographerMedias.push(photographerMedias)
        getKeyAndValue(photographerMedias, arrayOfPhotographerMediasKeyValue)
        // console.log(photographerMedias); 
    });
    // photographerMedias(arrayOfPhotographerMedias)
    getPhotographerPageMediasDOM(arrayOfPhotographerMedias, photographerJsonId)
}

function getKeyAndValue(photographerMedias, arrayOfPhotographerMediasKeyValue) {
    Object.entries(photographerMedias).forEach(([key, value]) => {
        arrayOfPhotographerMediasKeyValue.push({key, value})
    });
}

// console.log(arrayOfPhotographerMedias);
// console.log(arrayOfPhotographerMediasKeyValue);




export function getPhotographerPageMediasDOM(data){ 
    
    data.forEach(el => {
        const {image, video, photographerId} = el
        const photographer_medias_section = document.querySelector('.photographer_medias_section')
        const article = document.createElement('article')
        const aLink = document.createElement('a')
        
        article.classList.add('photographer_media_container')
        photographer_medias_section.appendChild(article)
        
        if (image) { 
            const img = document.createElement('img') 
            img.classList.add('dev')
            img.setAttribute('src', `./assets/images/${photographerId}/${image}`)
            aLink.appendChild(img)  
            aLink.setAttribute('href', '#')
            article.appendChild(aLink)
        }

        if (video) { 
            console.log(video);
            const video_container = document.createElement('video') 
            const videoMedia = document.createElement('source')

            video_container.classList.add('dev')
            video_container.setAttribute('controls', "")
            video_container.appendChild(videoMedia)
            
            aLink.appendChild(video_container)  
            aLink.setAttribute('href', '#')
            article.appendChild(aLink)
            
            videoMedia.setAttribute('src', `./assets/images/${photographerId}/${video}`)
            videoMedia.setAttribute('type', 'video/mp4')
        }   
    })
}
