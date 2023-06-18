import { DOMElement, photographerName, photographerCity, photographerTagline, photographerPrice } from "../components/DomElement.js";
import { photographerPicture, photographerPortrait } from "../components/Portrait.js";


export function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data
    
    function getUserCardDOM() {
        const article = document.createElement('article')
        article.setAttribute("aria-labelledby", "Descriptions-des-photographes")
        article.setAttribute("role", "group")
        article.setAttribute("aria-label", "Description du photographe")
        
        //Photographer img Portrait Link (is a link and the container of the img portrait)
        const imgContainerLink = document.createElement('a')
        imgContainerLink.setAttribute("href", `./photographer.html?id=${id}` )
        imgContainerLink.classList.add('photographer_portrait_container')
        
        
        //Photographer img portrait
        const picture = photographerPicture(data)
        photographerPortrait(data, picture, imgContainerLink)
        article.appendChild(imgContainerLink)
        
        //Photographer Name
        const photographerName_payload = photographerName(data)
        DOMElement(photographerName_payload, article)
        
        // Photographer City & Country
        const photographerCity_payload = photographerCity(data)
        DOMElement(photographerCity_payload, article)
        
        // Photographer Tagline
        const photographerTagline_payload = photographerTagline(data)
        DOMElement(photographerTagline_payload, article)
        
        // Photographer Price per day
        const photographerPrice_payload = photographerPrice(data)
        DOMElement(photographerPrice_payload, article)
        
        return (article);
    }
    return { name, id, city, country, tagline, price, portrait, getUserCardDOM }
}


// DEV IN PROGRESS 🤯🤯🤯

// export const photographersHomeSection = function(holder, data) {
//     console.log(data)
//     Object.keys(data).map(k=>{
//         const key1stLetterToUpperCase = k.charAt(0).toUpperCase() + k.slice(1) // name ==> Name
//         holder[`photographer${key1stLetterToUpperCase.split(' ').join('')}`] = data[k]
//     })
//     return holder
// };
    
///////////////////: