import {getPhotographerMediaById, getPhotographerById } from "../api/API.js"
import { DOMElement, photographerName } from "../components/DomElement.js"
import { photographerPicture } from "../components/Portrait.js"


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

    // picture for function Portrait
    const picture = photographerPicture(photographer)
    
    const photographHeaderContainer = document.querySelector('.photographHeader_container')
    const photographHeaderLeft = photographHeaderContainer.querySelector('.left')
    const photographHeaderMiddle = photographHeaderContainer.querySelector('.middle')
    const photographHeaderRight = photographHeaderContainer.querySelector('.right')
    const photographContactButton = document.getElementById('photograph_contact_button_position')



    // Photographer name
    const photographerName_payload = photographerName(photographer)
    const addClass = 'page_name';
    photographerName_payload.classNames = photographerName_payload.classNames.concat(' ', addClass);
    DOMElement(photographerName_payload, photographHeaderLeft)
    
    
    //Photographer city & country
    const photographCityAndCOuntry = document.createElement('span')
    photographCityAndCOuntry.textContent = (`${city}, ${country}`)
    photographCityAndCOuntry.classList.add('photographer_city', 'page_city')

    photographHeaderLeft.appendChild(photographCityAndCOuntry)

    //Photographer tagline
    const photographTagline = document.createElement('span')
    photographTagline.textContent = tagline
    photographTagline.classList.add('photographer_tagline', 'page_tagline')

    photographHeaderLeft.appendChild(photographTagline)
    
    //Photographer img portrait
    const imgContainer = document.createElement('div')
    imgContainer.classList.add('photographer_portrait_container')

    const photographerPortrait = document.createElement('img')
    photographerPortrait.setAttribute("src", picture)
    photographerPortrait.setAttribute("alt", `${name} photographer portrait`)
    photographerPortrait.setAttribute("aria-label", `photo portrait du photographe ${name}`)
    photographerPortrait.classList.add('photographer_portrait')

    photographHeaderRight.appendChild(imgContainer)
    imgContainer.appendChild(photographerPortrait)

    //Photographer contact button
    photographContactButton.classList.add('photograph_contact_button_position')

}

