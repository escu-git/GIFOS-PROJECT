//HEADER BTNS
const logo = document.getElementById('mainLogo')
const favoritos = document.getElementById("favs")
const misGifos = document.getElementById("misGifos")
const gifCreateBtn = document.getElementById("createGif")

//SEARCH SECTION:
const divSearch = document.getElementById("searchContainer");
const inputSearch = document.getElementById("search");
const divSugerencia = document.getElementById("sugerencia");//Div sugerencias

let num = 0;
//Input
///////////////////////
inputSearch.addEventListener("keyup", (event)=>{
    if(event.keyCode === 13){ //Activa búsqueda con enter.
        printSearch(buscarGifs(inputSearch.value),inputSearch.value);//Busca en API e imprime en DOM.
    inputSearch.value = ""; //Vaciar casilla de búsqueda.
    }
});

//////////////SEARCH GIFS FUNCTION
async function buscarGifs(valorDeInput){
    let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u&q=${valorDeInput}&limit=60&offset=${num}&rating=g&lang=en`;
    let response = await fetch(urlSearch);
    return response.json();
}
//---------------------------------

//AUTOCOMPLETE API
async function autocompleteApi(valorDeInput){
    let urlSearch = `https://api.giphy.com/v1/gifs/search/tags?api_key=5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u&q=${valorDeInput}&limit=60&offset=${num}&rating=g&lang=en`;
    let response = await fetch(urlSearch);
    return response.json();
}
//////////////PRINT CONTENT IN DOM FUNCTION
let imprimirDOM= (imagen)=>{
    //CREATE ELEMENTS:
    let newDiv = document.createElement('div'); //Div de cada IMG
    let newGif = document.createElement('img'); //IMG de cada Div
    let overlay = document.createElement('div'); //Overlay violeta de cada div/img
    let like = document.createElement('img'); 
    let download = document.createElement('img'); 
    let maxImg = document.createElement('img');
    let userTitle = document.createElement('h4');
    let gifTitle = document.createElement('h3');
    //Añadir atributos y class:
    newGif.src = imagen; //Trae img del array
    newGif.classList.add("imgBox"); //main.scss
    newDiv.classList.add('newDiv'); //js-styles.scss
    like.src= "assets/icon-fav.svg"
    download.src= "assets/icon-download.svg"
    maxImg.src="assets/icon-max-normal.svg"
    like.classList.add('inserted');
    download.classList.add('inserted');
    maxImg.classList.add('inserted');
    //////MOUSEOVER VIOLETA, FAV, DOWNLOAD & MAX
    newGif.addEventListener("mouseover",(event)=>{
        if(event){
        overlay.classList.add('overlayStyle');
        imgBox.style.zIndex = "-1";
        newDiv.style.zIndex = "1";
        }
    })
    overlay.addEventListener('mouseleave', (event)=>{
    overlay.classList.remove('overlayStyle');
    })

    //////
        //Mandar al DOM
        divSearch.appendChild(newDiv);
        newDiv.appendChild(newGif);
        newDiv.appendChild(overlay);
        overlay.appendChild(like);
        overlay.appendChild(download);
        overlay.appendChild(maxImg);
        
};
///////////////COLOR, Y FUNCIONES EN FOTOS
function imgAttributes(){
    let printedImg = document.getElementByClass('imgBox')

}
///////////////////////Imprimir imagenes y texto
async function printSearch(fnBuscar, textoBuscado) {
    let printSearchArray = []; //Array con contenido de API
    if(printSearchArray.length > 0){
        printSearchArray=[];
    }
    changeTitle(textoBuscado);
    
    //Array e imagenes
    let apiArray = await fnBuscar
    apiArray.data.forEach(array=>{
        printSearchArray.push(array);
        printSearchArray.forEach(imagenes=>{
            imprimirDOM(imagenes.images.downsized.url)
        })
    })
};
//ARREGLAR FUNCTION PARA CAMBIAR EL TITULO!!!!!
function changeTitle(textoBuscado){
    let trendingTitle = document.createElement('h2');
    let texto = document.createTextNode(textoBuscado);
    let divTrends = document.getElementById('trends');
    if(trendingTitle.hasChildNodes()){
    trendingTitle.removeChild(texto)
    }
    trendingTitle.appendChild(texto)
    divTrends.appendChild(trendingTitle);
}
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
/////////////////////////
async function sugerencias(){
    let sugerenciasArray=[];
    var sugerenciaTitle = document.createElement('h3');
    divSugerencia.innerHTML = "";
    let sugerencias = await autocompleteApi(inputSearch.value);
    console.log(sugerencias)
    sugerenciasArray=[];
    sugerencias.data.forEach(array =>{
    sugerenciasArray.push(array.name);
    });

    for(let i=0; i<3;i++){
        sugerenciaTitle.innerHTML = sugerenciasArray[i];
        divSugerencia.appendChild(sugerenciaTitle);
    }
    if(inputSearch.value ==""){
        divSugerencia.removeChild(sugerenciaTitle);
    }
}