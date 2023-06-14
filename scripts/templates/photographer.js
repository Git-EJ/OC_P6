function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data
    // console.log(data);
    
    //Retrieval Picture of Photographer
    let idForPicture = portrait
    idForPicture = id
    const picture = `assets/photographers/${id}.jpg`
    
    
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
        function photographersPortrait () {
            const photographerPortrait = document.createElement('img')
            photographerPortrait.setAttribute("src", picture)
            photographerPortrait.setAttribute("alt", `${name} photographer portrait`)
            photographerPortrait.setAttribute("aria-label", `photo portrait du photographe ${name}`)
            photographerPortrait.classList.add('photographer_portrait')
            return photographerPortrait
        }
        const photographerPortrait = photographersPortrait()

        /**
         * function for add photographer name, city, tagline, price per day
         * @param {String} tag new HTML Tag
         * @param {Object.Key} objectKey data/photographer.json
         * @param {String} addClass
         * @returns {HTMLElement} newly created 
         */
        function addElement (tag, objectKey, addClass, ariaLabel) {
            const newElement = document.createElement(tag)
            newElement.textContent = objectKey ?? ("Pas d'informations") //nullish work for name and tagline
            newElement.classList.add(addClass)
            newElement.setAttribute("aria-label", ariaLabel)
            return newElement
        }

        // Photographer Name
        const photographerName = addElement('h2', name, 'photographer_name', `nom du photographe: ${name}`)
        
        //Photographer City
        const cityAndCountrySpan = addElement('span', (`${city}, ${country}`), 'photographer_city', `ville et pays du photographe: ${city} ${country}`)

        //Photographer Tagline
        const taglineSpan = addElement('span', tagline, 'photographer_tagline', `devise du photographe: ${tagline}`)
        
        // Photographer Price
        const pricePerDaySpan = addElement('span', (`${price}\u20AC/jour`), 'photographer_price',`prix du photographe: ${price}\u20AC/jour`)

        
        article.appendChild(imgContainerLink)
        imgContainerLink.appendChild(photographerPortrait)
        
        article.appendChild(photographerName)
        article.appendChild(cityAndCountrySpan)
        article.appendChild(taglineSpan)
        article.appendChild(pricePerDaySpan)
        
        return (article);
    }
    return { name, id, city, country, tagline, price, portrait, getUserCardDOM }
}

// DEV IN PROGRESS 🤯🤯🤯

// const photographersHomeSection = function(data) {
    //     const photographer = {}
    //     const key = Object.keys(data)[0]
    //     const key1stLetterToUpperCase = key.charAt(0).toUpperCase() + key.slice(1)
    //     photographer.textContent = `photographer${key1stLetterToUpperCase}`
    // };
    


    // function toto (param1, param2, param3, param4) {
    //     const param1 = document.createElement(param2)
    //     param1.textContent = param3
    //     param1.classList.add(param4)
    //     return param1
    // }
    // toto(photographerName, 'h2', name, 'photographer_name')


    //END of dev in progress
    