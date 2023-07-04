// For home Main ==> photographer_section
// && For photographer page ==> header
export function DOMElement (json, parent) {
  const el = document.createElement(json.tag)
  json.textContent && (el.textContent = json.textContent)
  json.classNames && json.classNames.length > 0 && el.classList.add(...json.classNames.split(' '))
  Object.keys(json.attributes).forEach(k => {
    el.setAttribute(k, json.attributes[k])
  })
  parent && parent.appendChild(el)
  return el
}

export function photographerName (photographers) {
  const { name } = photographers
  const photographerNamePayload = {
    tag: 'h2',
    textContent: name,
    classNames: 'photographer_name',
    attributes: {
      role: 'Link (h2)', // for home Page - for page in pages/photographers.js
      'aria-label': `nom du photographe: ${name}`
    }
  }
  return photographerNamePayload
}

export function photographerCity (photographers) {
  const { city, country } = photographers
  const photographerCityPayload = {
    tag: 'span',
    textContent: (`${city}, ${country}`),
    classNames: 'photographer_city',
    attributes: {
      role: 'text paragraph',
      'aria-label': `ville et pays du photographe: ${city} ${country}`
    }
  }
  return photographerCityPayload
}

export function photographerTagline (photographers) {
  const { tagline } = photographers
  const photographerTaglinePayload = {
    tag: 'span',
    textContent: tagline,
    classNames: 'photographer_tagline',
    attributes: {
      role: 'text paragraph',
      'aria-label': `devise du photographe: ${tagline}`
    }
  }
  return photographerTaglinePayload
}

export function photographerPrice (photographers) {
  const { price } = photographers
  const photographerPricePayload = {
    tag: 'span',
    textContent: (`${price}\u20AC/jour`),
    classNames: 'photographer_price',
    attributes: {
      role: 'text paragraph',
      'aria-label': `prix du photographe: ${price}\u20AC/jour`
    }
  }
  return photographerPricePayload
}
