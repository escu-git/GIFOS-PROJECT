//HEADER BTNS
const logo = document.getElementById('mainLogo')
const favoritos = document.getElementById("favs")
const misGifos = document.getElementById("misGifos")
const gifCreateBtn = document.getElementById("createGif")
let searchesDiv = document.getElementById('searches');

//SEARCH SECTION:
const divSearch = document.getElementById("searchContainer");
const inputSearch = document.getElementById("search");
const divSugerencia = document.getElementById("sugerencia");//Div sugerencias
const verMas = document.createElement('img');
verMas.src = "assets/CTA-ver-mas.svg";

//ARRAY LOCALSTORAGE:
let arrayFavoritos; //
if(localStorage.getItem('favoritos').length > 0){
    arrayFavoritos = JSON.parse(localStorage.getItem('favoritos'));
}else{
    arrayFavoritos = [];
}

// if(localStorage.getItem('favoritos').lenght > 0){
//     arrayFavoritos = JSON.parse(localStorage.getItem('favoritos'));
// }
let num = 0;
let limit = 12;
//Input de búsqueda *** Acá se coloca el valor a buscar, y envía el valor a printSearch con buscarGifs como param
///////////////////////
inputSearch.addEventListener("keyup", (event)=>{
    if(event.keyCode === 13){ //Activa búsqueda con enter.
        printSearch(buscarGifs(inputSearch.value,"gifs","search",limit,0),inputSearch.value);//Busca en API e imprime en DOM.
    inputSearch.value = ""; //Vaciar casilla de búsqueda.
    }
});

//////////////SEARCH GIFS FUNCTION
async function buscarGifs(valorDeInput,tipoRequest1,tipoRequest2,limit,num){
    let urlSearch = `https://api.giphy.com/v1/${tipoRequest1}/${tipoRequest2}?api_key=${apiKey}&q=${valorDeInput}&limit=${limit}&offset=${num}&rating=g&lang=es`;
    let response = await fetch(urlSearch);
    return response.json();
}
//---------------------------------

//////////////PRINT CONTENT IN DOM FUNCTION
let imprimirDOM= (imagen, titulo, user)=>{
    //CREATE ELEMENTS:
    let newDiv = document.createElement('div'); //Div de cada IMG
    let newGif = document.createElement('img'); //IMG de cada Div
    let overlay = document.createElement('div'); //Overlay violeta de cada div/img
    let like = document.createElement('img'); 
    let download = document.createElement('img'); 
    let maxImg = document.createElement('img');
    let userTitle = document.createElement('h4');
    let gifTitle = document.createElement('h5'); 
    //AÑADIR USER Y TITULO A CADA GIF:
    userTitle.innerHTML=user
    gifTitle.innerHTML=titulo
    //Añadir atributos y class:
    newGif.src = imagen; //Trae img del array
    newGif.classList.add("imgBox"); //main.scss
    newDiv.classList.add('newDiv'); //js-styles.scss
    gifTitle.classList.add('userYTitle');
    userTitle.classList.add('userYTitle')
    like.classList.add('inserted');
    download.classList.add('inserted');
    maxImg.classList.add('inserted');
    like.src= "assets/icon-fav.svg";
    download.src= "assets/icon-download.svg";
    maxImg.src="assets/icon-max-normal.svg";


    //////MOUSEOVER VIOLETA, FAV, DOWNLOAD & MAX
    newGif.addEventListener("mouseover",(event)=>{
        if(event){
            overlay.classList.add('overlayStyle');
            newGif.style.zIndex = "-1";
            newDiv.style.zIndex = "1";
            userTitle.classList.add('userTitle');
            gifTitle.classList.add('gifTitle')
            overlay.appendChild(like);
            overlay.appendChild(download);
            overlay.appendChild(maxImg);
        }
    })
    overlay.addEventListener('mouseleave', (event)=>{
        if(event){
            overlay.classList.remove('overlayStyle');
            gifTitle.classList.remove('gifTitle');
            userTitle.classList.remove('userTitle');
            overlay.removeChild(like);
            overlay.removeChild(download);
            overlay.removeChild(maxImg);
        }
    })

        //ON HOVER:
    listenerCambioImg(like,'mouseover',"assets/icon-fav-hover.svg");
    listenerCambioImg(like,'mouseleave',"assets/icon-fav.svg");
    listenerCambioImg(download,'mouseover',"assets/icon-download-hover.svg")
    listenerCambioImg(download,'mouseleave',"assets/icon-download.svg")
    listenerCambioImg(maxImg,'mouseover',"assets/icon-max-hover.svg")
    listenerCambioImg(maxImg,'mouseleave',"assets/icon-max-normal.svg")

    
    //AÑADIR A FAVORITOS con click en LIKE:
    like.addEventListener('click',(event)=>{
    console.log(event.path[2].childNodes[0].currentSrc)
    array = [];
    let consulta = event.path[2].childNodes[0].currentSrc //ACÁ VOLCAR EL OBJETO PARA TOMAR TITULOS Y DEMÁS
    if(arrayFavoritos.includes(consulta)){ //Si el array no incluye el gif
        let index = arrayFavoritos.indexOf(consulta);
        arrayFavoritos.splice(index,1);
        console.log(arrayFavoritos);
    }else{ //Si el array ya incluye el gif:
        arrayFavoritos.push(consulta);
        console.log(arrayFavoritos);
    }//Acá se termina la logica de favoritos
    localStorage.setItem('favoritos', JSON.stringify(arrayFavoritos));
})

    //AGRANDAR IMAGEN con click en maxImg:
    maxImg.addEventListener('click',(event)=>{
        //Create elements:
        let body = document.getElementById('body');
        let agrandarImg = document.createElement('div')
        let img = document.createElement('img')
        let exit = document.createElement('img');
        let divInfo = document.createElement('div');
        let userTitleAgrandar = document.createElement('h4');
        let gifTitleAgrandar = document.createElement('h5');
        //Atributos:
        userTitleAgrandar.innerHTML=user
        gifTitleAgrandar.innerHTML=titulo
        exit.src="assets/close.svg"
        exit.classList.add('exit');
        exit.addEventListener('click',(event)=>{
        body.removeChild(agrandarImg);
        })
        divInfo.classList.add('divInfo');
        agrandarImg.classList.add('divAgrandarImg')
        img.classList.add('agrandarImg')
        img.src=event.path[2].children[0].currentSrc;
        userTitle.classList.add('userTitleAgrandar');
        gifTitle.classList.add('gifTitleAgrandar')
        //DOM:
        divInfo.appendChild(userTitleAgrandar);
        divInfo.appendChild(gifTitleAgrandar);
        divInfo.appendChild(like);
        divInfo.appendChild(download);
        agrandarImg.appendChild(img);
        agrandarImg.appendChild(exit);
        agrandarImg.appendChild(divInfo);
        body.appendChild(agrandarImg);
    })

        //Mandar al DOM
    divSearch.appendChild(newDiv);
    newDiv.appendChild(newGif);
    newDiv.appendChild(overlay);
    overlay.appendChild(userTitle);
    overlay.appendChild(gifTitle)
};

//Función para cambiar imagenes:
function listenerCambioImg(objeto,accion,imagen){
    objeto.addEventListener(accion,(event)=>{
        objeto.src=imagen
    })
}

//------------------------------
///////////////////////Imprimir imagenes y texto
async function printSearch(fnBuscar, textoBuscado) {
    let verMasDiv = document.createElement('div');
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
            imprimirDOM(imagenes.images.downsized.url, imagenes.title, imagenes.username)
            
        })
    })
    verMasDiv.appendChild(verMas);
    searchesDiv.appendChild(verMasDiv);
    listenerCambioImg(verMas, 'mouseover', "assets/CTA-ver-mas-hover.svg");
    listenerCambioImg(verMas, 'mouseleave', "assets/CTA-ver-mas.svg");
    if(localStorage.getItem('darkMode', 'on')){
        verMas.src="assets/CTA-ver+-modo-noc.svg"
        listenerCambioImg(verMas,"mouseover","assets/CTA-ver+hover-modo-noc.svg");
        listenerCambioImg(verMas,'mouseleave','assets/CTA-ver+-modo-noc.svg')
    }
};

verMas.addEventListener('click',(event)=>{
    limit+12;
    printSearch(buscarGifs(inputSearch.value,"gifs","search",limit,0),inputSearch.value);
    
})


//ARREGLAR FUNCTION PARA CAMBIAR EL TITULO!!!!!
function changeTitle(textoBuscado){
    let trendingTitle = document.createElement('h2');
    let texto = document.createTextNode(textoBuscado);
    let divTrends = document.getElementById('trends');
    if(texto.hasChildNodes()){
    trendingTitle.innerHTML="";
    }
    trendingTitle.appendChild(texto)
    divTrends.appendChild(trendingTitle);
}
//-------------------------------------

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

//SUGGESTIONS FUNCTION
async function sugerencias(){
    let sugerenciasArray=[];
    var sugerenciaTitle = document.createElement('h3');
    divSugerencia.innerHTML = "";
    let sugerencias = await buscarGifs(inputSearch.value,"gifs","search/tags",3,0);
    sugerenciasArray=[];
    sugerencias.data.forEach(array =>{
        sugerenciasArray.push(array.name);
    });
    for(let i=0;i<sugerenciasArray.length;i++){
    sugerenciaTitle.innerHTML = sugerenciasArray[i];
    divSugerencia.appendChild(sugerenciaTitle);
    }
    if(inputSearch.value ==""){
    divSugerencia.innerHTML="";
    }

    sugerenciaTitle.onclick = (event)=>{
        let buscar = event.path[0].innerHTML;
        printSearch(buscarGifs(buscar,"gifs","search",3,0),buscar)
    }
}


function imprimirFavs(array){
    let favGifsDivs = document.getElementById('favGifsDiv');
    let imgDiv = document.createElement('div');
    let img = document.createElement('img');
    arrayFavoritos.forEach(element=>{
        img.src=element;
        imgDiv.appendChild(img);
        favGifsDivs.appendChild(imgDiv);
    })

}

imprimirFavs(arrayFavoritos);