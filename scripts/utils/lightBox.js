const displayLightBox = () => {lightBox.style.display = 'flex'}
const closeLightBox = () => {lightBox.style.display = 'none'}
document.addEventListener('keydown', (e) => {e.key === 'Escape' ?  closeLightBox() : ''})


const medias = [...document.querySelectorAll('article')] // Array of medias
const lightBox = document.querySelector('.lightbox') // lightbox = lb
const lbModal = document.querySelector('.lightbox_modal')
const lbBefore = document.querySelector('.lightbox_modal_before')
const lbAfter = document.querySelector('.lightbox_modal_after')

const lbImg = document.createElement('img')
const lbVideo = document.createElement('video')



medias.forEach((m,i) => {
 
    let mediaName = m.getAttribute ('name')
    let mediaPhotographerId = m.getAttribute('data-photographer-id')
    let mediaType = m.getAttribute ('data-type')

    let lbCurrentMediaIndex = null
    
    m.addEventListener(('click'), () => {
        lbCurrentMediaIndex = i
        
        if (mediaType === 'image') {
            lbImg.classList.add('lightbox_modal_media')
            lbImg.setAttribute('src', `/assets/images/${mediaPhotographerId}/${mediaName}` )
            lbImg.setAttribute("data-type", 'image')

            lbModal.appendChild(lbImg)
            

        } else if (mediaType === 'video') {
            lbVideo.classList.add('lightbox_modal_media')
            lbVideo.setAttribute('src', `/assets/images/${mediaPhotographerId}/${mediaName}` )
            
            const removeVideoExt = mediaName.split(".")[0] //for video poster 
            
            lbVideo.setAttribute('controls', "controls")
            lbVideo.setAttribute('preload', "metadata")
            lbVideo.setAttribute('poster', `/assets/images/${mediaPhotographerId}/${removeVideoExt}.jpg`)
            lbVideo.setAttribute('type', 'video/mp4')
            lbVideo.setAttribute("data-type", 'video')
            
            lbModal.appendChild(lbVideo)
        }    
        
        lbBefore.addEventListener(('click'), () => {

            if (lbCurrentMediaIndex <= medias.length-1 && lbCurrentMediaIndex > 0 ) {
                lbCurrentMediaIndex--
                const lbMediaBefore = medias[lbCurrentMediaIndex];
                const lbMediaBeforeType = lbMediaBefore.getAttribute('data-type')
                console.log(lbCurrentMediaIndex, lbMediaBefore);
                
                if (lbMediaBeforeType === 'image') {
                    lbImg.classList.add('lightbox_modal_media')
                    lbImg.setAttribute('src', `/assets/images/${lbMediaBefore.getAttribute('data-photographer-id')}/${lbMediaBefore.getAttribute('name')}`)
        
                
                } else if (lbMediaBeforeType === 'video') {
                    lbVideo.classList.add('lightbox_modal_media')
                    const removeVideoExt = lbMediaBefore.getAttribute('name').split(".")[0]
                    lbVideo.setAttribute('poster', `/assets/images/${lbMediaBefore.getAttribute('data-photographer-id')}/${removeVideoExt}.jpg`);
                    lbVideo.setAttribute('src', `/assets/images/${lbMediaBefore.getAttribute('data-photographer-id')}/${lbMediaBefore.getAttribute('name')}`)
                    lbVideo.setAttribute('controls', "controls")
                    lbVideo.setAttribute('preload', "metadata")
                    lbVideo.setAttribute('type', 'video/mp4')
                }
            }
        })
        
        lbAfter.addEventListener(('click'), () => {

            if (lbCurrentMediaIndex < medias.length-1) {
                lbCurrentMediaIndex++
                const lbMediaAfter = medias[lbCurrentMediaIndex];
                const lbMediaAfterType = lbMediaAfter.getAttribute('data-type')
                console.log(lbCurrentMediaIndex, lbMediaAfter);
                
                if (lbMediaAfterType === 'image') {
                    lbImg.classList.add('lightbox_modal_media')
                    lbImg.setAttribute('src', `/assets/images/${lbMediaAfter.getAttribute('data-photographer-id')}/${lbMediaAfter.getAttribute('name')}`)
                }

                if (lbMediaAfterType === 'video') {
                    lbVideo.classList.add('lightbox_modal_media')
                    const removeVideoExt = lbMediaAfter.getAttribute('name').split(".")[0]
                    lbVideo.setAttribute('poster', `/assets/images/${lbMediaAfter.getAttribute('data-photographer-id')}/${removeVideoExt}.jpg`);
                    lbVideo.setAttribute('src', `/assets/images/${lbMediaAfter.getAttribute('data-photographer-id')}/${lbMediaAfter.getAttribute('name')}`)
                    lbVideo.setAttribute('controls', "controls")
                    lbVideo.setAttribute('preload', "metadata")
                    lbVideo.setAttribute('type', 'video/mp4')
                }
            }
        })
    })
})





