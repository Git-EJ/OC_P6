import { DOMElement, photographerName, photographerCity, photographerTagline, photographerPrice } from '../components/DomElement.js'
import { photographerPicture, photographerPortrait } from '../components/Portrait.js'

export function photographerTemplate (data) {
  const { name, id, city, country, tagline, price, portrait } = data

  function getUserCardDOM () {
    const article = document.createElement('article')
    article.setAttribute('aria-labelledby', 'Descriptions-des-photographes')
    article.setAttribute('role', 'group')
    article.setAttribute('aria-label', 'Description du photographe')

    // Photographer img Portrait Link
    const imgContainerLink = document.createElement('a')
    imgContainerLink.setAttribute('href', `./photographer.html?id=${id}`)
    imgContainerLink.classList.add('photographer_portrait_container')
    imgContainerLink.setAttribute('tabindex', '3')

    // Photographer  name Link
    const nameContainerLink = document.createElement('a')
    nameContainerLink.setAttribute('href', `./photographer.html?id=${id}`)
    nameContainerLink.setAttribute('tabindex', '3')

    // Photographer img portrait
    const picture = photographerPicture(data)
    photographerPortrait(data, picture, imgContainerLink)
    article.appendChild(imgContainerLink)

    // Photographer Name
    const photographerNamePayload = photographerName(data)
    photographerNamePayload.classNames = photographerNamePayload.classNames.concat(' ', 'home_name')
    DOMElement(photographerNamePayload, nameContainerLink)
    article.appendChild(nameContainerLink)

    // Photographer City & Country
    const photographerCityPayload = photographerCity(data)
    photographerCityPayload.classNames = photographerCityPayload.classNames.concat(' ', 'home_city')
    photographerCityPayload.attributes.tabindex = '3'
    DOMElement(photographerCityPayload, article)

    // Photographer Tagline
    const photographerTaglinePayload = photographerTagline(data)
    photographerTaglinePayload.classNames = photographerTaglinePayload.classNames.concat(' ', 'home_tagline')
    photographerTaglinePayload.attributes.tabindex = '3'
    DOMElement(photographerTaglinePayload, article)

    // Photographer Price per day
    const photographerPricePayload = photographerPrice(data)
    photographerPricePayload.classNames = photographerPricePayload.classNames.concat(' ', 'home_price')
    photographerPricePayload.attributes.tabindex = '3'
    DOMElement(photographerPricePayload, article)

    return (article)
  }
  return { name, id, city, country, tagline, price, portrait, getUserCardDOM }
}
