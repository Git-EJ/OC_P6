import { DOMElement} from "../components/DomElement.js";
import { Portrait } from "../components/Portrait.js";

export function photographerTemplate(data) {
    
    const { name, id, city, country, tagline, price, portrait } = data
    
    //Retrieval Picture of Photographer
    let idForPicture = portrait
    idForPicture = id
    const ext = portrait.split('.').slice(-1)[0]
    const picture = `./assets/photographers/${id}.${ext}`
    


    function getUserCardDOM() {
        const article = document.createElement('article')
        article.setAttribute("aria-labelledby", "Descriptions-des-photographes")
        article.setAttribute("role", "group")
        article.setAttribute("aria-label", "Description du photographe")
        
        //Photographer img Portrait Link (is a link and the container of the img portrait)
        const imgContainerLink = document.createElement('a')
        imgContainerLink.setAttribute("href", `./photographer.html?id=${id}` )
        imgContainerLink.classList.add('photographer_portrait_container')

        article.appendChild(imgContainerLink)

        //Photographer img portrait
        Portrait(
            picture,
            `${name} photographer portrait`,
            'photographer_portrait',
            imgContainerLink
        )


        // Photographer Name
        const photographerName_payload= {
            tag: "h2",
            textContent: name,
            classNames: 'photographer_name',
            attributes: {
                "aria-label": `nom du photographe: ${name}`
            }
        }

        // Photographer City & Country
        const photographerCity_payload= {
            tag: "span",
            textContent: (`${city}, ${country}`),
            classNames: 'photographer_city',
            attributes: {
                "aria-label": `ville et pays du photographe: ${city} ${country}`
            }
        }

        // Photographer Tagline
        const photographerTagline_payload= {
            tag: "span",
            textContent: tagline,
            classNames: 'photographer_tagline',
            attributes: {
                "aria-label": `devise du photographe: ${tagline}`
            }
        }

        // Photographer Price per day
        const photographerPrice_payload= {
            tag: "span",
            textContent: (`${price}\u20AC/jour`),
            classNames: 'photographer_price',
            attributes: {
                "aria-label": `prix du photographe: ${price}\u20AC/jour`
            }
        }

        DOMElement(photographerName_payload, article)
        DOMElement(photographerCity_payload, article)
        DOMElement(photographerTagline_payload, article)
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