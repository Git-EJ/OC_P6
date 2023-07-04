// //Retrieval Picture of Photographer base on the id
export function photographerPicture (photographer) {
  const { id, portrait } = photographer
  const ext = portrait.split('.').slice(-1)[0] // ext for extension
  const picture = `./assets/photographers/${id}.${ext}`
  return picture
}

/**
 * @param {string} picture url de l'image
 * @param {string} name nom du photographe
 */
export function DOMPortrait (picture, altText, className, parent = null) {
  const portrait = document.createElement('img')
  portrait.setAttribute('src', picture)
  portrait.setAttribute('alt', altText)
  portrait.setAttribute('role', 'link image') // for home Page - for page in pages/photographers.js
  portrait.setAttribute('aria-label', altText)
  portrait.classList.add(className)
  parent && parent.appendChild(portrait)
  return portrait
}

export function photographerPortrait (data, picture, imgContainer) {
  const name = data.name
  DOMPortrait(
    picture,
    `Photographe portrait: ${name}`,
    'photographer_portrait',
    imgContainer
  )
}
