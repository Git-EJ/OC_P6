import { photographerJsonId } from "../pages/photographer.js"


export function mediasLikesCounter() {
    const counterButtons  = document.querySelectorAll('.heartButton')
    const likesCounter = document.querySelectorAll('.medias_likes_counter')
    
    // for localstorage retrival medias name
    const mediasName = document.querySelectorAll('.medias_name')
    const mediaName = []
    mediasName.forEach(el => { mediaName.push(el.textContent) })
    
    
    counterButtons.forEach((el, i)=> {
        
        let isLiked = false
        let counterBase = +likesCounter[i].textContent
        
        let arrayOfLikes = []
        arrayOfLikes.push(counterBase)

        const lsKey = `${photographerJsonId}_${mediaName[i]}`
        const lsValue = localStorage.getItem(lsKey)
        
        if (lsValue) {
            const { counterBase: lsCounterBase, isLiked: lsIsLiked } = JSON.parse(lsValue)
            counterBase = lsCounterBase
            isLiked = lsIsLiked
            likesCounter[i].textContent = counterBase
            
            if (isLiked) {
                el.classList.add('isLiked')
            }
        }

        el.addEventListener(('click'), () => {
            if (el = !isLiked) {
                counterBase ++
                likesCounter[i].textContent = counterBase
                isLiked = true
                counterButtons[i].classList.add('isLiked')
                arrayOfLikes[i] = counterBase
                totalLikesCounter (arrayOfLikes);
                
                
            } else {
                counterBase --
                likesCounter[i].textContent = counterBase
                isLiked = false
                counterButtons[i].classList.remove('isLiked')
                arrayOfLikes[i] = counterBase
                totalLikesCounter (arrayOfLikes)
            }
            localStorage.setItem(`${photographerJsonId}_${mediaName[i]}`, JSON.stringify({counterBase, isLiked}))
        })
    })
    totalLikesCounter()
}


export function totalLikesCounter() {
    const counter = document.querySelector('.overlay_bottomRight_likesCounter')
    const heartIcon = document.createElement('i')
    const likes = document.querySelectorAll('.medias_likes_counter')

    let newArrayOfLikes = []
    likes.forEach(el => { newArrayOfLikes.push(el.textContent)})

    let newArrayOfLikesSum = newArrayOfLikes.reduce((acc, el) => acc + +el, 0)

    counter.textContent = newArrayOfLikesSum

    heartIcon.classList.add('fa-solid', 'fa-heart')
    counter.appendChild(heartIcon)
}