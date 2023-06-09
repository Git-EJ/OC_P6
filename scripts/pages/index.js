    async function getPhotographers() {
        let photographers = await fetch('/data/photographers.json')
        .then(res => res.json())
        .then(res => res.photographers)
        .catch(err => console.log('an error occurs', err))
        // console.log(photographers);
        return ({
            photographers: [...photographers]})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
  

