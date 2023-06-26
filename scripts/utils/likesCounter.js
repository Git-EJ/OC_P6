import {photographerJsonId, sortArray } from "../pages/photographer.js"

/**
 * 
 * @param {Array} arrayOfPhotographerMedias 
 */
export function mediasLikesCounter(arrayOfPhotographerMedias) {
    
    const lsKey = "photographer_"+photographerJsonId
    const lsValue = localStorage.getItem(lsKey)
    const likedItems = lsValue ? JSON.parse(lsValue): []

    arrayOfPhotographerMedias.forEach( media  => {
        const article = document.getElementById("media_"+media.id)
        const button = article.querySelector(".heartButton")
        const heart = article.querySelector(".media_description_likes_counter")

        let isLiked = likedItems.includes(media.id)
        heart.textContent = media.likes + (isLiked?1:0)
        
        if (isLiked) button.classList.add('isLiked')
        
        button.addEventListener(('click'), () => {
            if (!isLiked) {
                likedItems.push(media.id)
                button.classList.add('isLiked')
                isLiked = true
            } else {
                likedItems.splice(likedItems.indexOf(media.id),1)
                button.classList.remove('isLiked')
                isLiked = false
            }
            heart.textContent = media.likes + (isLiked?1:0)
            localStorage.setItem(lsKey, JSON.stringify(likedItems))
            totalLikesCounter ()
        })
    })
    totalLikesCounter()
}

// [TODO] duplicate cod photographer.js function sortArray]
const selectElement = document.getElementById('sort')
const defaultSort = document.getElementById('popularite')
let type = defaultSort.textContent.toLocaleLowerCase()
selectElement.addEventListener("change", (e)=>{
    type = e.target.value.toLowerCase()
})

/**
 * Overlay counter sum of all likes
 */
export function totalLikesCounter() {
    const counter = document.querySelector('.overlay_bottomRight_likesCounter')
    const likes = [...document.querySelectorAll('.media_description_likes_counter')]
    counter.textContent = likes.reduce((t,el) => { return t+ +el.textContent }, 0)
    type === "popularité" ? sortArray("popularité") : ""
}

