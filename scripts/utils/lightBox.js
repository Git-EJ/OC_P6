const displayLightBox = () => {lightBox.style.display = 'flex'}
const closeLightBox = () => {lightBox.style.display = 'none'}
document.addEventListener('keydown', (e) => {e.key === 'Escape' ?  closeLightBox() : ''})


const lightBox = document.querySelector('.lightbox') // lightbox = lb
const lbModal = document.querySelector('.lightbox_modal')


const lbImg = document.createElement('img')
const lbVideo = document.createElement('video')


const medias = document.querySelectorAll('article')
medias.forEach((m, i) => {
    m.addEventListener(('click'), () => {
        let mediaName = m.getAttribute ('name')
        let mediaPhotographerId = m.getAttribute('data-photographer-id')
        let mediaType = m.getAttribute ('data-type')
        
   
        lbImg.setAttribute('src', `/assets/images/${mediaPhotographerId}/${mediaName}` )
        

        if (mediaType === 'image') {
            lbImg.classList.add('lightbox_modal_media')
            lbImg.setAttribute('src', `/assets/images/${mediaPhotographerId}/${mediaName}` )
            lbModal.appendChild(lbImg)}
         
        
        else if (mediaType === 'video') {
            lbVideo.classList.add('lightbox_modal_media')
            lbVideo.setAttribute('src', `/assets/images/${mediaPhotographerId}/${mediaName}` )

            const removeVideoExt = mediaName.split(".")[0] //for video poster 
           
            lbVideo.setAttribute('controls', "controls")
            lbVideo.setAttribute('preload', "metadata")
            lbVideo.setAttribute('poster', `/assets/images/${mediaPhotographerId}/${removeVideoExt}.jpg`)
            lbVideo.setAttribute('type', 'video/mp4')
            
            lbModal.appendChild(lbVideo)}
    })
})

