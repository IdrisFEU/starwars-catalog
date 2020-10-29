let page = 1
const loading = document.querySelector('.loading')
const loadinghomeworld = document.querySelector('.loadinghomeworld')
const loadingdetail = document.querySelector('.loadingdetail')
const el = document.querySelector('.list');

function getCharacters(page) {
    el.innerHTML = ''
    loading.style.display = "block";
    fetch('http://swapi.dev/api/people/?page=' + page).then((res) => res.json())
    .then((data) => {
        document.querySelector('.page').innerHTML = page
        data.results.forEach(function(item) {
            const newEl = document.createElement('li');
            newEl.onclick = function () {
                getDetail(item.url)
                gethomeWorld(item.homeworld)
            };
            newEl.appendChild(document.createTextNode(item.name));
            el.appendChild(newEl);
      })
      loading.style.display = "none"
    })
}

function getDetail(url) {
    document.querySelector('.detailbox-content').innerHTML = ''
    loadingdetail.style.display = "flex";

    fetch(url).then((res) => res.json())
    .then((data) => {
        document.querySelector('.detailbox-content').innerHTML = `
           <h3> ${data.name}</h3>
           <p>Height: ${data.height}</p>
           <p>Mass: ${data.mass}</p>
           <p>Hair color: ${data.hair_color}</p>
           <p>Skin color: ${data.skin_color}</p>
           <p>Eye color: ${data.eye_color}</p>
           <p>Birth year: ${data.birth_year}</p>
           <p>Gender: ${data.gender}</p>
        `
        loadingdetail.style.display = "none";
      })
}

function gethomeWorld(url) {
    document.querySelector('.homeworldbox-content').innerHTML =''
    loadinghomeworld.style.display = "flex";
    fetch(url).then((res) => res.json())
    .then((data) => {
        document.querySelector('.homeworldbox-content').innerHTML = `
        <h3> ${data.name}</h3>
        <p>Rotation period: ${data.rotation_period}</p>
        <p>Diameter: ${data.diameter}</p>
        <p>Climate: ${data.climate}</p>
        <p>Gravity: ${data.gravity}</p>
        <p>Terrain: ${data.terrain}</p>
     `
        loadinghomeworld.style.display = "none";
      })
}

function nextPage() {
   if (page < 9) {
    page++
    getCharacters(page)
   }
}

function prevPage() {
    if (page > 1) {
        page--
    }

    getCharacters(page)
}

(function() {
    getCharacters(page)
})()