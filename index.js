const URL = 'https://restcountries.eu/rest/v2/all';
let paises = [];

//HACER PETICION URL GET
const fetchCountries = async (url = URL) => {
  try {
    const response = await fetch(url);
    const paises = await response.json();
    return paises;
  } catch (error) {
    console.error(error);
  }
};

//CREAR NODOS PARA INSERTAR HTML
const createNode = ({ flag, name, id, capital, population, region }) => {
  const node = `

  <div class="col-md-4 col-12" id="${id}">
        <div class="card mt-5 ml-3 carta">
            <img src="${flag}" class='img-fluid' />
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Capital: ${capital} </p>
                <p class="card-text">Poblacion: ${population} </p>
                <p class="card-text">Region: ${region} </p>
            </div>
        </div>
    </div>
  
  
  `;
  document.getElementById('cards').insertAdjacentHTML('beforeend', node);
  return node;
};

// ITERAR PAISES
const iterateCountry = (paises) => {
  paises.map((pais) => createNode(pais));
};

//BUSCAR PAISES X NOMBRE
const searchCountryByName = () => {
  const { value: name } = document.getElementById('input');
  const foundCountry = paises.find(
    (pais) => pais.name.toLowerCase() === name.toLowerCase()
  );
  document.getElementById('cards').innerHTML = '';
  createNode(foundCountry);

  return foundCountry;
};

//BUSCAR PAISES X REGION
const searchCountryByRegion = () => {
  const { value: region } = document.getElementById('searchRegion');
  const foundRegion = paises.filter(
    (pais) => pais.region.toLowerCase() === region.toLowerCase()
  );
  document.getElementById('cards').innerHTML = '';
  iterateCountry(foundRegion);

  return foundRegion;
};

//REINICIAR PAISES
const showAll = () => {
  location.reload();
  document.getElementById('input').value = '';
};

const start = async () => {
  document
    .getElementById('boton')
    .addEventListener('click', searchCountryByName);
  document.getElementById('boton2').addEventListener('click', showAll);
  document
    .getElementById('searchRegion')
    .addEventListener('change', searchCountryByRegion);
  paises = await fetchCountries();
  iterateCountry(paises);
};

window.onload = start;
