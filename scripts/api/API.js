let _data = null;

async function getData() {
    if (_data) return _data
    const ls = localStorage.getItem("photographers")
    if (!ls) {
        const data = await fetch('./data/photographers.json')
        .then(res => {
            if (res.ok) return res.json()
            throw new Error("response not ok")
        })
        .catch(err => {
            console.log('an error occurs', err);
            return {
                photographers:[],
                media:[]
            }
        })
        localStorage.setItem("photographers", JSON.stringify(data))
        _data = data
    } else {
        _data = JSON.parse(ls)
        return _data
    }
}

export async function getPhotographers () {
    const data = await getData()
    return data.photographers
}

export async function getPhotographerById (id) {
    const photographers = await getPhotographers()
    return photographers.find( p => p.id === id)
}

export async function getMedia () {
    const data = await getData()
    return data.media
}

export async function getPhotographerMediaById(id) {
    const media = await getMedia()
    return media.filter ( m => m.photographerId === id)
}