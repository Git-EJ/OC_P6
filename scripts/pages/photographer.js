import {getPhotographerMediaById, getPhotographerById } from "../api/API.js"
import { DOMElement, photographerName, photographerCity, photographerTagline } from "../components/DomElement.js"
import { photographerPicture, photographerPortrait,} from "../components/Portrait.js"


// get the photographer's id from the url
function getPhotographerID() {
    const findPhotographerID = (new URL(document.location)).searchParams
    return findPhotographerID.get('id')
}

const photographerId = +getPhotographerID()
if (!photographerId) {
    window.location.href="./index.html"
}


async function retrivalData() {
    const photographer = await getPhotographerById(photographerId)  

    getPhotographerPageDOM(photographer)
    // console.log(photographer);

    const photographerMedia = await getPhotographerMediaById(photographerId)
    // console.log(photographerMedia)
}
retrivalData()


function getPhotographerPageDOM (photographer) {
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

}

