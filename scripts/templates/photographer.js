import { DOMElement, photographerName, photographerCity, photographerTagline, photographerPrice } from "../components/DomElement.js";
import { photographerPicture, photographerPortrait } from "../components/Portrait.js";


export function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data
    
    function getUserCardDOM() {
        const article = document.createElement('article')
        article.setAttribute("aria-labelledby", "Descriptions-des-photographes")
        article.setAttribute("role", "group")
        article.setAttribute("aria-label", "Description du photographe")
        
        //Photographer img Portrait Link
        const imgContainerLink = document.createElement('a')
        imgContainerLink.setAttribute("href", `./photographer.html?id=${id}` )
        imgContainerLink.classList.add('photographer_portrait_container')
        imgContainerLink.setAttribute("tabindex", '3')
        

        //Photographer  name Link 
        const nameContainerLink = document.createElement('a')
        nameContainerLink.setAttribute("href", `./photographer.html?id=${id}` )
        nameContainerLink.setAttribute("tabindex", '3')
        

        //Photographer img portrait
        const picture = photographerPicture(data)
        photographerPortrait(data, picture, imgContainerLink)
        article.appendChild(imgContainerLink)
        
        //Photographer Name
        const photographerName_payload = photographerName(data)
        photographerName_payload.classNames = photographerName_payload.classNames.concat(' ', 'home_name')
        DOMElement(photographerName_payload, nameContainerLink)
        article.appendChild(nameContainerLink)
        
        // Photographer City & Country
        const photographerCity_payload = photographerCity(data)
        photographerCity_payload.classNames = photographerCity_payload.classNames.concat(' ', 'home_city')
        photographerCity_payload.attributes.tabindex = '3'
        DOMElement(photographerCity_payload, article)
        
        // Photographer Tagline
        const photographerTagline_payload = photographerTagline(data)
        photographerTagline_payload.classNames = photographerTagline_payload.classNames.concat(' ', 'home_tagline')
        photographerTagline_payload.attributes.tabindex = '3'
        DOMElement(photographerTagline_payload, article)
        
        // Photographer Price per day
        const photographerPrice_payload = photographerPrice(data)
        photographerPrice_payload.classNames = photographerPrice_payload.classNames.concat(' ', 'home_price')
        photographerPrice_payload.attributes.tabindex = '3'
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