// // Mettre le code JavaScript lié à la page photographer.html

async function getPhotographersData() {
    let photographers = await fetch('./data/photographers.json')
    .then(res => res.json())
    .then(res => res.photographers)
    // .then(res => res.media)
    .catch(err => console.log('an error occurs', err))
    console.log(photographers);
    return ({ photographers: [...photographers] })
}


async function retrivalData() {
    const {photographers, media} = await getPhotographersData()
    findPhotographerElementsById(photographers)
    // console.log(photographers);
}
retrivalData()



// get the photographer's id from the url
function getPhotographerID() {
    const findPhotographerID = (new URL(document.location)).searchParams
    return findPhotographerID.get('id')
}
const photographerId = Number(getPhotographerID())
// console.log(photographerId);


//Loop to retrieve photographer data based on url id
function findPhotographerElementsById(photographers) {
    for (let i=0 ; i < photographers.length ; i++){
        if(photographers[i].id === photographerId) {
            photographerPage(photographers[i])
            // console.log(photographers[i])
            break
        }
    }
}


function photographerPage (photographer) {
    // console.log(data);
    const { name, id, city, country, tagline, price, portrait } = photographer
    
     //Retrieval Picture of Photographer base on the id
    let idForPicture = portrait
    idForPicture = id
    const picture = `assets/photographers/${id}.jpg`
    
    function getUserPageDom(){
        const photographHeaderContainer = document.querySelector('.photographHeader_container')
        const photographHeaderLeft = photographHeaderContainer.querySelector('.left')
        const photographHeaderMiddle = photographHeaderContainer.querySelector('.middle')
        const photographHeaderRight = photographHeaderContainer.querySelector('.right')
        const photographContactButton = document.getElementById('photograph_contact_button_position')

        //Photograph name
        const photographName = document.createElement('h2')
        photographName.textContent = name
        photographName.classList.add('photographer_name', 'page_name')

        photographHeaderLeft.appendChild(photographName)

        //Photograph city & country
        const photographCityAndCOuntry = document.createElement('span')
        photographCityAndCOuntry.textContent = (`${city}, ${country}`)
        photographCityAndCOuntry.classList.add('photographer_city', 'page_city')

        photographHeaderLeft.appendChild(photographCityAndCOuntry)

        //Photograph tagline
        const photographTagline = document.createElement('span')
        photographTagline.textContent = tagline
        photographTagline.classList.add('photographer_tagline', 'page_tagline')

        photographHeaderLeft.appendChild(photographTagline)
        
        //Photograph img portrait
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('photographer_portrait_container')

        const photographerPortrait = document.createElement('img')
        photographerPortrait.setAttribute("src", picture)
        photographerPortrait.setAttribute("alt", `${name} photographer portrait`)
        photographerPortrait.setAttribute("aria-label", `photo portrait du photographe ${name}`)
        photographerPortrait.classList.add('photographer_portrait')

        photographHeaderRight.appendChild(imgContainer)
        imgContainer.appendChild(photographerPortrait)

        //Photograph contact button
        photographContactButton.classList.add('photograph_contact_button_position')

    }
    getUserPageDom()
}

