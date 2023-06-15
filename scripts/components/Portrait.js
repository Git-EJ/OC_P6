/**
 * @param {string} picture url de l'image
 * @param {string} name nom du photographe
 */
export function Portrait(picture, altText, className, parent=null) {
    //Photographer img portrait
    const portrait = document.createElement('img')
    portrait.setAttribute("src", picture)
    portrait.setAttribute("alt", altText)
    portrait.setAttribute("aria-label", altText)
    portrait.classList.add(className)
    parent && parent.appendChild(portrait)
    return portrait
}