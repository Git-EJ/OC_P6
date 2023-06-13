// // Mettre le code JavaScript lié à la page photographer.html

async function getPhotographersData() {
    let photographers = await fetch('/data/photographers.json')
    .then(res => res.json())
    .then(res => res.photographers)
    .catch(err => console.log('an error occurs', err))
    // console.log(photographers);
    return {photographers}
}

function getPhotographerID() {
    const findPhotographerID = (new URL(document.location)).searchParams
    return findPhotographerID.get('id')
}
const photographerId = Number(getPhotographerID())
console.log(photographerId);

async function initPhotographerPage() {
    // Récupère les datas des photographes
    const {photographers} = await getPhotographersData()
    // console.log(photographers);
    
    
    let findPhotographerElementsById
    for (let i=0 ; i < photographers.length ; i++){
        if(photographers[i].id == photographerId) {
            console.log(typeof photographerId, photographerId );
            console.log(photographers[i].id)
            findPhotographerElementsById = photographers[i] 
            console.log(findPhotographerElementsById);
            break
        }

    }
}





initPhotographerPage()
    


