/*function getCharacters(done){
    const results =fetch("https://rickandmortyapi.com/api/character");
    results 
    .then(response =>response.json())
    .then(data =>{
    done(data)
    });
    }

   getCharacters(data => {

        data.results.forEach(personaje => {
            const article = document.createRange().createContextualFragment(`

            <article>
        <div class="imagen-container">
        <img scr="${personaje.imagen}" alt="personaje"></img>
        </div>
        <h2>${personaje.name}</h2>
        <span>${personaje.status}</span>
            </article>
            `);

        const main = document.querySelector("main");

        main.append(article);

        });

    });*/



   /* const aplicacion = document.querySelector('.pj');
const imge = document.querySelector('#image');
const status = document.querySelector('#status')
const species = document.querySelector('#species')
const btnS = document.querySelector('#next')
const btnA = document.querySelector('#prev')
const url = 'https://rickandmortyapi.com/api/character/'
const origen = document.querySelector('#origen')

const obtenerDatos = (apiURL) => {
    return fetch(apiURL) //hago peticion que devuelve una promesa
    .then(res => res.json()) //la promesa la resuelvo con then y nos da usa respuesta,esa respuesta la parseo a json
    .then(data => { //una vez que se resuelve la promesa anterior capturamos los datos
        imprimirDatos(data)
        imprimirPagina(data.info)
    })
    .catch(err => console.log(err))
}
const imprimirDatos = (datos,e) => {
    let html = '';
    aplicacion.innerHTML = html;
    datos.results.forEach(pjs => { //despues de iterar pjs es un objeto con todas las propiedades
        let p = document.createElement('p');
        let nombres = pjs.name
        p.setAttribute('id', pjs.id);
        p.innerHTML = pjs.name;
        aplicacion.appendChild(p);
        p.addEventListener('click', () => {
            imge.innerHTML = `<img src="https://rickandmortyapi.com/api/character/avatar/${pjs.id}.jpeg" />`
            status.innerHTML = `El personaje se encuentra: ${pjs.status}`
            species.innerHTML = `Es de la especie tipo: ${pjs.species}`
            origen.innerHTML = `Su origen es: ${pjs.origin.name}`
        })
    });
};

const imprimirPagina = (data) => {
    console.log('aoe')
    let sePuedeP = data.prev == null ? 'disabled' : '';
    let sePuedeN = data.next == null ? 'disabled' : '';
    let html = `<button id="btn" ${sePuedeP} onclick="obtenerDatos('${data.prev}')">Previous</button>`
    html += `<button id="btn" ${sePuedeN} onclick="obtenerDatos('${data.next}')">Next</button>`
    document.querySelector('.botones').innerHTML = html;
}

obtenerDatos(url)*/


const urlApi = 'https://rickandmortyapi.com/api/character/';
const listEl = document.getElementById('list');
const logoEl = document.getElementById('logo');

let nextUrl = '';
let prevUrl = '';
let numPages = '';

const getCharacters = async (url, name = '') => {
    if (name !== '') {
        var response = await fetch(`${url}?name=${name}`);        
    } else {
        var response = await fetch(url);        
    }
    
    const data = await response.json();
    nextUrl = data.info.next;
    prevUrl = data.info.prev;
    numPages = data.info.pages;    
    
    const characters = data.results;
    render(characters);

    resultPage();
}

const searchCharacters = (evento) => {
    evento.preventDefault();    
    const name = document.querySelector('input').value;
    getCharacters(urlApi, name);
}

const render = (characters) => {
    listEl.innerHTML = '';
    characters.map((character) => {
        listEl.insertAdjacentHTML('beforeend', `
    <div class="card">
      <div class="card-header">
        <p class="card-title">${character.name}</p>
      </div>
      <div class="card-img">
        <img src="${character.image}" alt="${character.name}"/>
      </div>
      <div class="card-body">
        <p><b>Gender:</b> ${character.gender}</p>
        <p><b>Species:</b> ${character.species}</p>
        <p><b>Origin:</b> ${character.origin.name}</p>
      </div>
      <div class="card-info">
      <button>Ver más</button>
      </div>
    </div>
    `)
    })        

}

const nextPage = () => {
    getCharacters(nextUrl);
}
const prevPage = () => {
    getCharacters(prevUrl);
}
const homePage = () => {
    getCharacters(urlApi);
}

const resultPage = () => {     
    document.getElementById("prev").style.display = 'block';
    document.getElementById("next").style.display = 'block';
    if (nextUrl == null) {
        document.getElementById("next").style.display = 'none';     
    }
    if (prevUrl == null) {        
        document.getElementById("prev").style.display = 'none';
    }
}

getCharacters(urlApi);
