//HEADER BTNS
const logo = document.getElementById('mainLogo')
const favoritos = document.getElementById("favs")
const misGifos = document.getElementById("misGifos")
const gifCreateBtn = document.getElementById("createGif")

//SEARCH SECTION:
const divSearch = document.getElementById("searchContainer");
const inputSearch = document.getElementById("search");
const newDiv = document.createElement('div');
const divSugerencia = document.getElementById("sugerencia");//Div sugerencias

let num = 0;
//Input
inputSearch.addEventListener("keyup", (event)=>{
    if(event.keyCode === 13){ //Activa búsqueda con enter.
        printSearch(buscarGifs(inputSearch.value));//Busca en API e imprime en DOM.
    inputSearch.value = ""; //Vaciar casilla de búsqueda.
    }
});

//////////////SEARCH GIFS FUNCTION
async function buscarGifs(valorDeInput){
    let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u&q=${valorDeInput}&limit=12&offset=${num}&rating=g&lang=en`;
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
    //Mandar al DOME
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
inputSearch.addEventListener("keyup",(event)=>{
    if(inputSearch.value != ""){
        divSugerencia.classList.add("sugerencia");
        inputSearch.classList.add("whenSugerencia");
    }else{
        divSugerencia.classList.remove("sugerencia");
        inputSearch.classList.remove("whenSugerencia");
    }
    sugerencias();
});
async function sugerencias(){
    let sugerenciasArray=[];
    var sugerenciaTitle = document.createElement('h3');
    divSugerencia.innerHTML = "";
    //if(divSugerencia.hasChildNodes()){
      //  divSugerencia.removeChild(sugerenciaTitle);

    //}
    let sugerencias = await buscarGifs(inputSearch.value);
    sugerencias.data.forEach(array =>{
    sugerenciasArray.push(array.title);
    });
    for(let i=0; i<3;i++){
        sugerenciaTitle.innerHTML = sugerenciasArray[i];
        divSugerencia.appendChild(sugerenciaTitle);
    }
    if(inputSearch.value ==""){
        divSugerencia.removeChild(sugerenciaTitle);
    }
}
//Botón MÁS GIFS:

// let contadorClicks = 0;
// function moreGifs(){

    
// }