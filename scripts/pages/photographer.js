import { getPhotographerMediaById, getPhotographerById } from "../api/API.js"
import { DOMElement, photographerName, photographerCity, photographerTagline } from "../components/DomElement.js"
import { photographerPicture, photographerPortrait,} from "../components/Portrait.js"
import { ContactForm } from "../utils/contactForm.js"
import { Lightbox } from "../utils/lightBox.js"
import { mediasLikesCounter } from "../utils/likesCounter.js"


/**
 * get the photographer's id from the url
 * @returns id of photographer
 */
function getPhotographerID() {
    const findPhotographerID = (new URL(document.location)).searchParams
    return findPhotographerID.get('id')
}

export const photographerJsonId = +getPhotographerID()
if (!photographerJsonId) {
    window.location.href="./index.html"
}

/**
 * retrival data from api.js
 */
async function retrivalData() {
    const photographer = await getPhotographerById(photographerJsonId) 
    getPhotographerPageHeaderDOM(photographer)
    
    const photographersMedias = await getPhotographerMediaById(photographerJsonId)
    getPhotographerMedias(photographersMedias)
    
    // Array of medias
    const medias = [...document.querySelectorAll('article')]

    const mediasAriaLabel = [...document.querySelectorAll('article img[aria-label], article video[aria-label]' )];
   
    mediasAriaLabel.forEach((el,i)=>{
        const arrayOfMediaAriaLabel = el.getAttribute('aria-label')
        medias[i].arialabel = arrayOfMediaAriaLabel
    })

    const lightbox = new Lightbox()
    lightbox.open(medias.map(m=>{
        const content = m.querySelector(".media")
        const type = m.getAttribute('data-type')
        const title = m.getAttribute('title')
        const url = type === "video" ? content.querySelector("source").getAttribute("src") : content.getAttribute("src")
        const ariaLabel = m.arialabel
        return { content, title, type, url, ariaLabel }
    }))

    //Call contact Form for photographer name 
    const contactForm = new ContactForm()
    contactForm.open()
    

    let originalTabIndex = []
    
    lightbox.callbackOnOpen = () => {
        const notModal= document.querySelector('.not_modal')
        const notModalTabIndex = [...notModal.querySelectorAll('[tabindex]')]
        notModalTabIndex.forEach(el => {
            originalTabIndex.push(el.getAttribute('tabindex'))
            el.setAttribute("tabindex", "-1")
        })
        notModal.setAttribute('aria-hidden','true')
    }

    contactForm.callbackOnOpen = () => {
        const notModal= document.querySelector('.not_modal')
        const notModalTabIndex = [...notModal.querySelectorAll('[tabindex]')]
        notModalTabIndex.forEach(el => {
            originalTabIndex.push(el.getAttribute('tabindex'))
            el.setAttribute("tabindex", "-1")
        })
        notModal.setAttribute('aria-hidden','true')
    }
    

    lightbox.callbackOnClose = () => {
        const notModal= document.querySelector('.not_modal')
        const notModalTabIndex = [...notModal.querySelectorAll('[tabindex]')]
        notModalTabIndex.forEach((el,i) => {
            el.setAttribute("tabindex", originalTabIndex[i])
        })
        notModal.setAttribute('aria-hidden','false')
        originalTabIndex = []
    }

   contactForm.callbackOnClose = () => {
        const notModal= document.querySelector('.not_modal')
        const notModalTabIndex = [...notModal.querySelectorAll('[tabindex]')]
        notModalTabIndex.forEach((el,i) => {
            el.setAttribute("tabindex", originalTabIndex[i])
        })
        notModal.setAttribute('aria-hidden','false')
        originalTabIndex = []
    }
}

/**
 * 
 * @param {object} photographer 
 * personal infos and id from photographers.json
 * @returns name, id, city, country, tagline, price, portrait
*/

function getPhotographerPageHeaderDOM (photographer) {;
    const { name, id, city, country, tagline, price, portrait } = photographer
    const photographBannerContainer = document.querySelector('.photographBanner_container')
    const photographBannerLeft = photographBannerContainer.querySelector('.left')
    const photographBannerRight = photographBannerContainer.querySelector('.right')
    const photographContactButton = document.getElementById('photograph_contact_button')
    const pricePerDay = document.querySelector('.overlay_bottomRight_pricePerDay')
    
    
    // Photographer name
    const photographerName_payload = photographerName(photographer)
    photographerName_payload.classNames = photographerName_payload.classNames.concat(' ', 'page_name')
    photographerName_payload.attributes.role = 'banner (h2)'
    photographerName_payload.attributes.tabindex= '2'
    DOMElement(photographerName_payload, photographBannerLeft)

    
    //Photographer city & country
    const photographerCity_payload = photographerCity(photographer)
    photographerCity_payload.classNames = photographerCity_payload.classNames.concat(' ', 'page_city')
    photographerCity_payload.attributes.tabindex= '3'
    DOMElement(photographerCity_payload, photographBannerLeft)
    

    //Photographer tagline
    const photographerTagline_payload = photographerTagline(photographer)
    photographerTagline_payload.classNames = photographerTagline_payload.classNames.concat(' ', 'page_Tagline')
    photographerTagline_payload.attributes.tabindex= '3'
    DOMElement(photographerTagline_payload, photographBannerLeft)
    
    
    //Photographer img portrait container
    const imgContainer = document.createElement('div')
    imgContainer.classList.add('photographer_portrait_container', 'page_portrait')
    imgContainer.setAttribute("tabindex", '5')
    photographBannerRight.appendChild(imgContainer)
    
    const picture = photographerPicture(photographer)
    photographerPortrait(photographer, picture, imgContainer)
    
    
    //Photographer contact button
    photographContactButton.classList.add('photograph_contact_button')
    photographContactButton.setAttribute("tabindex", '4')
    
    //Photographer portrait
    const photographerPagePortrait = document.querySelector('.photographer_portrait')
    photographerPagePortrait.setAttribute("role", 'image')
    
    // Photographer pricePerDay in overlay
    pricePerDay.textContent = `${price}\u20AC / jour`

    return { name, id, city, country, tagline, price, portrait, getPhotographerPageHeaderDOM }
}

/**
 * 
 * @param {arrays} photographersMedias  
 * arrays of objects for all photographers personal infos from photographers.json
*/
function getPhotographerMedias(photographersMedias) {
    
    const arrayOfPhotographerMedias = []
    
    photographersMedias.forEach(photographerMedias => {
        arrayOfPhotographerMedias.push(photographerMedias)
    });
    getPhotographerPageMediasDOM(arrayOfPhotographerMedias)
    console.log();
}


/**
 * @param {Array} data array of media
*/
export function getPhotographerPageMediasDOM(data) { 
    
    data.forEach(el => {
        const { id, image, video, title, likes, photographerId, date, ariaLabel} = el
        const photographer_medias_section = document.querySelector('.photographer_medias_section')

        const article = document.createElement('article')
        article.id = id
        article.date = date
        article.title = title
        article.setAttribute("data-photographer-id", photographerId)
        article.setAttribute("data-type", image)
        article.setAttribute("id", "media_"+id)
        article.setAttribute("date", "media_"+date)
        image ?  article.setAttribute("name", image) : ""
        video ?  article.setAttribute("name", video) : "" 
        article.classList.add('photographer_media_container')
        
        const mediaNameAndLikes = document.createElement('div')
        const mediaName = document.createElement('span')
        const mediaLikes = document.createElement('span')
        const mediaLikesCounter = document.createElement('span')
        const heartIcon = document.createElement('em')
        
        
        if (image) { 
            const img = document.createElement('img') 
            img.classList.add('media')
            img.setAttribute('src', `./assets/images/${photographerId}/${image}`)
            img.setAttribute('alt', `${title}`)
            img.setAttribute('role', 'image link')
            img.setAttribute('aria-label', `${ariaLabel??title}`)
            img.setAttribute("tabindex", 9)
            article.setAttribute("data-type", 'image')
            article.appendChild(img)  
        }
        
        if (video) { 
            const removeVideoExt = video.split(".")[0] //for video poster 
            
            const video_container = document.createElement('video') 
            const videoMedia = document.createElement('source')
            
            video_container.classList.add('media')   
            video_container.setAttribute('alt', `${title}`)
            video_container.setAttribute('role', 'video link')
            video_container.setAttribute('aria-label', `${ariaLabel??title}`)
            video_container.setAttribute("tabindex", 9)
            article.setAttribute("data-type", 'video')
            video_container.setAttribute('controls', "controls")
            video_container.setAttribute('preload', "metadata")
            video_container.setAttribute('poster', `/assets/images/${photographerId}/${removeVideoExt}.jpg`)
            video_container.appendChild(videoMedia)
            
            article.appendChild(video_container)  
            
            videoMedia.setAttribute('src', `./assets/images/${photographerId}/${video}`)
            videoMedia.setAttribute('type', 'video/mp4')
        }   
        
        mediaNameAndLikes.classList.add('media_description')
        
        mediaName.classList.add('media_description_name')
        mediaName.textContent = `${title}`
        mediaName.setAttribute("tabindex", '11')
       
        mediaLikes.classList.add('media_description_likes_container')
        
        mediaLikesCounter.classList.add('media_description_likes_counter')
        mediaLikesCounter.textContent = `${likes}`
        mediaLikesCounter.setAttribute('role', 'text')
        mediaLikesCounter.setAttribute('aria-label', 'number of likes')
        mediaLikesCounter.setAttribute('tabindex', '12')
        
        
        heartIcon.classList.add('fa-solid', 'fa-heart')
        heartIcon.classList.add('heartButton')
        heartIcon.setAttribute('role', 'button  ')
        heartIcon.setAttribute('aria-label', 'like button  ')
       
        
        article.appendChild(mediaNameAndLikes)
        mediaNameAndLikes.appendChild(mediaName)
        mediaNameAndLikes.appendChild(mediaLikes)
        mediaLikes.appendChild(mediaLikesCounter)
        mediaLikes.appendChild(heartIcon)
        
        photographer_medias_section.appendChild(article)
    })
    mediasLikesCounter(data)
}


/**
 * Function for sort photographers medias by popularity, date and title
 * @param {string} type select/option VALUE
 * @param {boolean} force false when no localStorage 
*/
export function sortArray (type) {

    const mediaContainer = document.querySelector(".photographer_medias_section")
    const medias = [...mediaContainer.querySelectorAll("article")]
    medias.map(m=>mediaContainer.removeChild(m))

    if (type ==="popularité") {
        medias.sort((a,b) => {
            const aLikes = a.querySelector(".media_description_likes_counter")
            const bLikes = b.querySelector(".media_description_likes_counter")
            return bLikes.textContent - aLikes.textContent
        })
    
    } else if (type === "titre") {
        medias.sort((a,b) => {
            const aTitle = a.title
            const bTitle = b.title
            return aTitle.localeCompare(bTitle);
        })

    } else if (type === 'date (plus récents)'|| type === 'date (plus anciens)') {
        medias.sort((a,b) => {
            const aDate = a.date
            const bDate = b.date
            const aNewDate = new Date(aDate)
            const bNewDate = new Date(bDate)
            const byDate = type === 'date (plus récents)' ? bNewDate - aNewDate : aNewDate - bNewDate
            return byDate
        })
    }
    medias.map(m=>mediaContainer.appendChild(m))
}


window.onload = () => {
    
    retrivalData()

    const selectElement = document.getElementById('sort')
    selectElement.addEventListener("change", (e)=>{
        const name = e.target.value.toLowerCase()
        sortArray(name)
    })
    
}
