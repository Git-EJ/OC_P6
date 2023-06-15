/**
 * function for add photographer name, city, tagline, price per day
 * @param {String} tag new HTML Tag
 * @param {Object.Key} objectKey data/photographer.json
 * @param {String} addClass
 * @returns {HTMLElement} newly created 
 */

export function DOMElement_ (tag, objectKey=null, addClass='', ariaLabel='', parent=null) {
    const newElement = document.createElement(tag)
    objectKey && (newElement.textContent = objectKey)
    addClass && addClass.length>0 && newElement.classList.add(...addClass.split(' '))
    ariaLabel && newElement.setAttribute("aria-label", ariaLabel)
    parent && parent.appendChild(newElement)
    return newElement
}

export function DOMElement (json, parent) {
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