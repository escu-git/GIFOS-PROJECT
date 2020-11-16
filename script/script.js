//HEADER BTNS
const logo = document.getElementById('mainLogo')
const favoritos = document.getElementById("favs")
const misGifos = document.getElementById("misGifos")
const gifCreateBtn = document.getElementById("createGif")
//URLs
const home = "index.html";
const URLFav = "favorites.html";
const URLGifos = "myGifos.html";

//CREATE ELEMENTS:
let anchor = document.createElement('a');
//SEARCH SECTION:
const divSearch = document.getElementById("searchContainer");
const inputSearch = document.getElementById("search");
const newDiv = document.createElement('div');
let limit = 25;

//Header hyperlinks:
logo.setAttribute('href', "index.html");

//Input
inputSearch.addEventListener("keyup", (event)=>{
    if(event.keyCode === 13){ //Activa búsqueda con enter.
        printSearch(buscarGifs(inputSearch.value));//Busca en API e imprime en DOM.
    inputSearch.value = ""; //Vaciar casilla de búsqueda.
        
    }
});

//////////////SEARCH GIFS FUNCTION
async function buscarGifs(valorDeInput){
    let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u&q=${valorDeInput}&limit=${limit}&offset=0&rating=g&lang=en`;
    let response = await fetch(urlSearch);
    return response.json();
}
//////////////PRINT CONTENT IN DOM FUNCTION
let imprimirDOM= (imagen)=>{
    //CREATE ELEMENTS:
    let newGif = document.createElement('img');
    //Añadir atributos:
    newGif.src = imagen;
    newGif.classList.add("imgBox");
    newDiv.classList.add("newDiv");
    //Mandar al DOM
    newDiv.appendChild(newGif)
    divSearch.appendChild(newDiv);
}

async function printSearch(fnBuscar) {
    let printSearchArray = []; //Array con contenido de API
    if(printSearchArray.length > 0){
        printSearchArray=[];
    }
    let apiArray = await fnBuscar
    apiArray.data.forEach(array=>{
    printSearchArray.push(array);
        printSearchArray.forEach(imagenes=>{
            imprimirDOM(imagenes.images.downsized.url)
            })
    })
};

///////////////SEARCH & AUTOCOMPLETE:
inputSearch.addEventListener("",(event)=>{
    inputSearch.classList.toggle("inputJS");
});