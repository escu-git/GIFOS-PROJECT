//SEARCH SECTION:
const divSearch = document.getElementById("searchContainer");
const inputSearch = document.getElementById("search");

//CREATE ELEMENTS:
let newDiv = document.createElement('div');
let newGif = document.createElement('img');

inputSearch.addEventListener("keyup", (event)=>{
    if(event.keyCode === 13){ //Activa búsqueda con enter.
        printSearch(buscarGifs(inputSearch.value));//Busca en API e imprime en DOM.
        inputSearch.value = ""; //Vaciar casilla de búsqueda.
    }
});

//////////////SEARCH GIFS FUNCTION
async function buscarGifs(valorDeInput){
    let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u&q=${valorDeInput}&limit=25&offset=0&rating=g&lang=en`;

    let response = await fetch(urlSearch);
    return response.json();
}
//////////////PRINT CONTENT IN DOM FUNCTION
let imprimirDOM= (imagen)=>{
    let newDiv = document.createElement('div');
    let newGif = document.createElement('img');
    newGif.src = imagen;
    newDiv.appendChild(newGif)
    divSearch.appendChild(newDiv)
}
let printSearchArray = []; //Array con contenido de API
async function printSearch(fnBuscar) {
    let apiArray = await fnBuscar
    apiArray.data.forEach(array=>{
    printSearchArray.push(array);
        printSearchArray.forEach(imagenes=>{
            imprimirDOM(imagenes.images.downsized.url)
            })
    })
};