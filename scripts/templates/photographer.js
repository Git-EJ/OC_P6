function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    console.log(data);

    const picture = `assets/images/photographers_id/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${name} photographer portrait`)
        
        const h2 = document.createElement('h2');
        h2.textContent = name;

        const cityAndCountrySpan = document.createElement('span')
        cityAndCountrySpan.textContent = (`${city}, ${country}`)
        
        const taglineSpan = document.createElement('span')
        taglineSpan.textContent = tagline

        const pricePerDaySpan = document.createElement('span')
        pricePerDaySpan.textContent = (`${price}\u20AC/jour`)


        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(cityAndCountrySpan);
        article.appendChild(taglineSpan);
        article.appendChild(pricePerDaySpan)

        return (article);
    }
    return { name, id, city, country, tagline, price, portrait, getUserCardDOM }
}