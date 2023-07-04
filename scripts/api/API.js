let _data = null

async function _getData () {
  if (_data) return _data
  const ls = localStorage.getItem('photographers')
  if (!ls) {
    const data = await fetch('./data/photographers.json')
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('response not ok')
      })
      .catch(err => {
        console.log('an error occurs', err)
        return {
          photographers: [],
          media: []
        }
      })
    localStorage.setItem('photographers', JSON.stringify(data)) // localStorage only string for storage
    _data = data
  } else {
    _data = JSON.parse(ls) // local storage string to json object
  }
  return _data
}

/**
 *
 * @returns photographers : name, id (of photographer), city, country, tagline, price, portrait
 */
export async function getPhotographers () {
  const data = await _getData()
  return data.photographers
}

export async function getPhotographerById (id) {
  const photographers = await getPhotographers()
  return photographers.find(p => p.id === id)
}

/**
 *
 * @returns media : id (of media), photographerId, title, image, likes, date, price, ariaLabel
 */
export async function getMedia () {
  const data = await _getData()
  return data.media
}

export async function getPhotographerMediaById (id) {
  const media = await getMedia()
  return media.filter(m => m.photographerId === id)
}
