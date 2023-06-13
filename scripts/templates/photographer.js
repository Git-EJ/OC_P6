function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    // console.log(data);
    
    //Retrieval Picture of Photographer
    let idForPicture = portrait
    idForPicture = id
    const picture = `assets/photographers/${id}.jpg`;
    
    
    function getUserCardDOM() {
        const article = document.createElement('article');
        
        //Photographer img Portrait
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('img_container')
        const imgForPhotographers = document.createElement('img');
        imgForPhotographers.setAttribute("src", picture)
        imgForPhotographers.setAttribute("alt", `${name} photographer portrait`)
        imgForPhotographers.classList.add('photographer_img')
        
        
        /**
         * 
         * @param {String} tag new HTML Tag
         * @param {Object.Key} objectKey data/photographer.json
         * @param {String} addClass
         * @returns {HTMLElement} newly created 
         */
        function addElement (tag, objectKey, addClass) {
            const newElement = document.createElement(tag)
            newElement.textContent = objectKey
            newElement.classList.add(addClass)
            return newElement
        }

        // Photographer Name
        const photographerName = addElement('h2', name, 'photographer_name')
        
        //Photographer City
        const cityAndCountrySpan = addElement('span', (`${city}, ${country}`), 'photographer_city')

        //Photographer Tagline
        const taglineSpan = addElement('span', tagline, 'photographer_tagline')
        
        // Photographer Price
        const pricePerDaySpan = addElement('span', (`${price}\u20AC/jour`), 'photographer_price')

        
        article.appendChild(imgContainer)
        imgContainer.appendChild(imgForPhotographers);
        
        article.appendChild(photographerName);
        article.appendChild(cityAndCountrySpan);
        article.appendChild(taglineSpan);
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
    
    