
// For home Main ==> photographer_section
// && For photographer page ==> header
export function DOMElement(json, parent) {
    const el = document.createElement(json.tag)
    json.textContent && (el.textContent=json.textContent)
    json.classNames && json.classNames.length>0 && el.classList.add(...json.classNames.split(' '))
    json.children && json.children.map(c=>loadDOMJson(c, el))
    Object.keys(json.attributes).map(k => {
        el.setAttribute(k, json.attributes[k])
    })
    parent && parent.appendChild(el)
    return el;
}

export function photographerName(photographers) {
    const {name} = photographers
    const photographerName_payload= {
        tag: "h2",
        textContent: name,
        classNames: ('photographer_name'),
        attributes: {
            "aria-label": `nom du photographe: ${name}`
        }
    }
    return photographerName_payload
}

export function photographerCity(photographers) {
    const { city, country } = photographers
    const photographerCity_payload= {
        tag: "span",
        textContent: (`${city}, ${country}`),
        classNames: 'photographer_city',
        attributes: {
            "aria-label": `ville et pays du photographe: ${city} ${country}`
        }
    }
    return photographerCity_payload
}

export function photographerTagline(photographers) {
    const { tagline } = photographers
    const photographerTagline_payload= {
        tag: "span",
        textContent: tagline,
        classNames: 'photographer_tagline',
        attributes: {
            "aria-label": `devise du photographe: ${tagline}`
        }
    }
    return photographerTagline_payload
}

export function photographePrice(photographers) {
    const {price} = photographers
    const photographerPrice_payload= {
        tag: "span",
        textContent: (`${price}\u20AC/jour`),
        classNames: 'photographer_price',
        attributes: {
            "aria-label": `prix du photographe: ${price}\u20AC/jour`
        }
    }
    return photographerPrice_payload
}