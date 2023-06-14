// // Mettre le code JavaScript lié à la page photographer.html

async function getPhotographersData() {
    let photographers = await fetch('/data/photographers.json')
    .then(res => res.json())
    .then(res => res.photographers)
    .catch(err => console.log('an error occurs', err))
    // console.log(photographers);
    return ({
        photographers: [...photographers]})
}


async function retrivalData() {
    const {photographers} = await getPhotographersData()
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


function photographerPage (data) {
    // console.log(data);
    const { name, id, city, country, tagline, price, portrait } = data
    
     //Retrieval Picture of Photographer base on the id
    let idForPicture = portrait
    idForPicture = id
    const picture = `assets/photographers/${id}.jpg`
    
    function getUserPageDom(){
        const photographHeader = document.querySelector('.photograph-header')
    
        //Photographer img portrait
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('photographer_portrait_container')

        const photographerPortrait = document.createElement('img')
        photographerPortrait.setAttribute("src", picture)
        photographerPortrait.setAttribute("alt", `${name} photographer portrait`)
        photographerPortrait.setAttribute("aria-label", `photo portrait du photographe ${name}`)
        photographerPortrait.classList.add('photographer_portrait')

        photographHeader.appendChild(imgContainer)
        imgContainer.appendChild(photographerPortrait)
    }
    getUserPageDom()
}

