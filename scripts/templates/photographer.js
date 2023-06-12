function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    console.log(data);

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

        //Photographer Name
        const photographerName = document.createElement('h2');
        photographerName.textContent = name;
        photographerName.classList.add('photographer_name')

        //Photographer City
        const cityAndCountrySpan = document.createElement('span')
        cityAndCountrySpan.textContent = (`${city}, ${country}`)
        cityAndCountrySpan.classList.add('photographer_city')
        
        //Photographer Tagline
        const taglineSpan = document.createElement('span')
        taglineSpan.textContent = tagline
        taglineSpan.classList.add('photographer_tagline')

        // Photographer Price
        const pricePerDaySpan = document.createElement('span')
        pricePerDaySpan.textContent = (`${price}\u20AC/jour`)
        pricePerDaySpan.classList.add('photographer_price')

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


// const photographersHomeSection = function(data) {
//     const photographer = document.createElement('h2')
//     const key = Object.keys(data)[0]
//     const key1stLetterToUpperCase = key.charAt(0).toUpperCase() + key.slice(1)
//     photographer.textContent = `photographer${key1stLetterToUpperCase}`
//     console.log(photographer);
// }