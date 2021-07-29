
darkStyle === 'on' ? cancelSearch.src = 'assets/close-modo-noct.svg' : cancelSearch.src = 'assets/close.svg'
cancelSearch.setAttribute('id', 'cancelSearch')
cancelSearch.style.display='none';
cancelSearch.style.cursor = 'pointer';

verMas.src= 'assets/CTA-ver-mas.svg'
listenerCambioImg(verMas,"mouseover","assets\CTA-ver-mas-hover.svg");
listenerCambioImg(verMas,'mouseleave','assets/CTA-ver-mas.svg')

searchDiv.appendChild(cancelSearch)

//ARRAY LOCALSTORAGE:
if(localStorage.getItem('favoritos') === null){
    localStorage.setItem('favoritos',"") //Esto chequea si la key 'favoritos' existe en localStorage, caso contrario, la crea.
}
let arrayFavoritos; 
if(localStorage.getItem('favoritos').length > 0){
    arrayFavoritos = JSON.parse(localStorage.getItem('favoritos'));
}else{
    arrayFavoritos = [];
}

let num = 0;
let limit = 12;
let currentQuery, resultOffSet, totalCount;

inputSearch.addEventListener("keyup", (event)=>{
    currentQuery = inputSearch.value;
    resultOffSet = 2;
    cancelSearch.classList.add('cancelSearch');
    cancelSearch.style.display='block';
    if(event.keyCode === 13){ //Inicia búsqueda al oprimir ENTER
        printSearch(buscarGifs(currentQuery,"gifs","search",3,0),currentQuery);//Busca en API e imprime en DOM.
        inputSearch.value = ""; //Vaciar casilla de búsqueda.
        cancelSearch.style.display='none';
        cancelSearch.classList.remove('cancelSearch');
    }
    if(event.keyCode === 27 || inputSearch.value ==""){ //Se cierra la búsqueda al oprimir ESC
        inputSearch.value = "";
        cancelSearch.style.display = 'none';
        cancelSearch.classList.remove('cancelSearch');
    }
});

cancelSearch.addEventListener('click',(event)=>{
    inputSearch.value="";
    cancelSearch.classList.remove('cancelSearch');
    cancelSearch.style.display='none';
    divSugerencia.innerHTML="";
    divSugerencia.classList.remove("sugerencia");
        inputSearch.classList.add('search')
        inputSearch.classList.remove("whenSugerencia");
});


//See more button:
verMas.addEventListener('click',(event)=>{
    resultOffSet += 2;
    printSearch(buscarGifs(currentQuery,"gifs","search",resultOffSet,0),currentQuery);
})

//!SEARCH GIFS FUNCTION
async function buscarGifs(valorDeInput,tipoRequest1,tipoRequest2,limit,num){
    let urlSearch = `https://api.giphy.com/v1/${tipoRequest1}/${tipoRequest2}?api_key=${apiKey}&q=${valorDeInput}&limit=${limit}&offset=${num}&rating=g&lang=es`;
    let response = await fetch(urlSearch);
    results = response.json();

    if(resultOffSet > totalCount){
        console.log('No more results to show!!!')
    }
    return results
}

//---------------------------------

//!PRINT CONTENT IN DOM FUNCTION
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


    download.addEventListener('click',(event)=>{
        console.log(event.path[2].childNodes[0].currentSrc)
        let source = event.path[2].childNodes[0].currentSrc;
        let link = document.createElement('a');
        link.href = source;
        link.target ='blank'
        link.download = 'downloadedGif.jpg'
        link.click()
        link.removeChild()
            //VER DESCARGA DEL ARCHIVO
    })


    //*MOUSEOVER VIOLETA, FAV, DOWNLOAD & MAX
    newGif.addEventListener("mouseover",(event)=>{
            overlay.classList.add('overlayStyle');
            newGif.style.zIndex = "-1";
            newDiv.style.zIndex = "1";
            userTitle.classList.add('userTitle');
            gifTitle.classList.add('gifTitle')
            overlay.appendChild(like);
            overlay.appendChild(download);
            overlay.appendChild(maxImg);
    })
    overlay.addEventListener('mouseleave', (event)=>{
            overlay.classList.remove('overlayStyle');
            gifTitle.classList.remove('gifTitle');
            userTitle.classList.remove('userTitle');
            overlay.removeChild(like);
            overlay.removeChild(download);
            overlay.removeChild(maxImg);
    })

        //ON HOVER:
    // listenerCambioImg(like,'mouseover',"assets/icon-fav-hover.svg");
    // listenerCambioImg(like,'mouseleave',"assets/icon-fav.svg");
    // listenerCambioImg(download,'mouseover',"assets/icon-download-hover.svg")
    // listenerCambioImg(download,'mouseleave',"assets/icon-download.svg")
    // listenerCambioImg(maxImg,'mouseover',"assets/icon-max-hover.svg")
    // listenerCambioImg(maxImg,'mouseleave',"assets/icon-max-normal.svg")

    if(arrayFavoritos.includes(imagen)){ //Si el array no incluye el gif
        console.log(imagen)
    }else{ //Si el array ya incluye el gif:
    }//Acá se termina la logica de favoritos
    
    //AÑADIR A FAVORITOS con click en LIKE:
    like.addEventListener('click',(event)=>{
    array = [];
    let consulta = event.path[2].childNodes[0].currentSrc //ACÁ VOLCAR EL OBJETO PARA TOMAR TITULOS Y DEMÁS
    if(arrayFavoritos.includes(consulta)){ //Si el array ya incluye el GIF, lo elimina:
        let index = arrayFavoritos.indexOf(consulta);
        arrayFavoritos.splice(index,1);
        console.log(arrayFavoritos);
        showLikes(event.path[1].offsetParent,"¡Eliminado de favoritos!");
    }else{ //Si el array no incluye el GIF, lo suma:
        arrayFavoritos.push(consulta);
        console.log(arrayFavoritos);
        showLikes(event.path[1].offsetParent,"¡Añadido a favoritos!");
    }//Acá se termina la logica de favoritos
    localStorage.setItem('favoritos', JSON.stringify(arrayFavoritos));
    imprimirFavs(arrayFavoritos)
})
    //*AGRANDAR IMAGEN con click en maxImg:
    maxImg.addEventListener('click',(event)=>{
        //*Create elements:
        let body = document.getElementById('body');
        let agrandarImg = document.createElement('div')
        let img = document.createElement('img')
        let exit = document.createElement('img');
        let divInfo = document.createElement('div');
        let userTitleAgrandar = document.createElement('h4');
        let gifTitleAgrandar = document.createElement('h5');
        //*Atributos:
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
        //*DOM:
        divInfo.appendChild(userTitleAgrandar);
        divInfo.appendChild(gifTitleAgrandar);
        divInfo.appendChild(like);
        divInfo.appendChild(download);
        agrandarImg.appendChild(img);
        agrandarImg.appendChild(exit);
        agrandarImg.appendChild(divInfo);
        body.appendChild(agrandarImg);
    })

        //*Mandar al DOM
    divSearch.appendChild(newDiv);
    newDiv.appendChild(newGif);
    newDiv.appendChild(overlay);
    overlay.appendChild(userTitle);
    overlay.appendChild(gifTitle)
};

//*Función para cambiar imagenes:
function listenerCambioImg(objeto,accion,imagen){
    objeto.addEventListener(accion,(event)=>{
        objeto.src=imagen
    })
}

//------------------------------
//*Imprimir imagenes y texto
async function printSearch(fnBuscar, textoBuscado) {
    let verMasDiv = document.createElement('div');
    let filtrarArray = [];
    let printSearchArray = []; //Array con contenido de API
    if(printSearchArray.length > 0){
        printSearchArray=[];
    }
    changeTitle(textoBuscado);
    if(divSearch.hasChildNodes()){
        divSearch.innerHTML = ""; //Borrar busquedas anteriores, si es que las hay.
    }
//*Array e imagenes
    let apiArray = await fnBuscar
    apiArray.data.forEach(array=>{
        // console.log(array)
        filtrarArray.push(array);
        printSearchArray = filtrarArray.filter((item, index)=>{
            return filtrarArray.indexOf(item) === index;
        })
        console.log(printSearchArray)

        
        printSearchArray.forEach(imagenes=>{
            imprimirDOM(imagenes.images.downsized.url, imagenes.title, imagenes.username)
        })
        
    })
    verMasDiv.appendChild(verMas);
    searchesDiv.appendChild(verMasDiv);
    listenerCambioImg(verMas, 'mouseover', "assets/CTA-ver-mas-hover.svg");
    listenerCambioImg(verMas, 'mouseleave', "assets/CTA-ver-mas.svg");

};

//*Titulo de búsqueda en DOM -----
function changeTitle(textoBuscado){
    let trendingTitle = document.createElement('h2');
    let texto = document.createTextNode(textoBuscado);
    let divTrends = document.getElementById('sugerenciaTitle');
    if(divTrends.hasChildNodes()){
        divTrends.innerHTML=""; 
    }//Borrar titulos anteriores, si es que los hay

    trendingTitle.appendChild(texto)
    divTrends.appendChild(trendingTitle);
}
//-------------------------------------

//*SEARCH & AUTOCOMPLETE:
inputSearch.addEventListener("keyup",(event)=>{
    if(inputSearch.value != ""){
        divSugerencia.classList.add("sugerencia");
        inputSearch.classList.add("whenSugerencia");
        inputSearch.classList.remove('search')
    }else{
        divSugerencia.classList.remove("sugerencia");
        inputSearch.classList.add('search')
        inputSearch.classList.remove("whenSugerencia");
    }
    sugerencias();
});

//SUGGESTIONS FUNCTION
async function sugerencias(){
    let lupa = document.createElement('img');
    lupa.src = 'assets/icon-search.svg';
    lupa.classList.add('lupa');
    let sugerenciasArray=[];
    var sugerenciaTitle = document.createElement('h3');
    divSugerencia.innerHTML = "";
    let sugerencias = await buscarGifs(inputSearch.value,"gifs","search/tags",3,0);
    sugerenciasArray=[];
    sugerencias.data.forEach(array =>{
        sugerenciasArray.push(array.name);
    });
    for(let i=0;i<sugerenciasArray.length;i++){
    let sugerencia = document.createElement('div');
    sugerencia.classList.add('sugerenciaDiv')
    sugerencia.appendChild(lupa);
    sugerenciaTitle.innerHTML = sugerenciasArray[i];
    sugerenciaTitle.style.cursor = 'pointer';
    sugerencia.appendChild(sugerenciaTitle)
    divSugerencia.appendChild(sugerencia);
    }
    if(inputSearch.value ==""){
    divSugerencia.innerHTML="";
    }

    sugerenciaTitle.onclick = (event)=>{
        let buscar = event.path[0].innerHTML;
        inputSearch.value="";
        cancelSearch.classList.remove('cancelSearch');
        cancelSearch.style.display='none';
        divSugerencia.innerHTML="";
        divSugerencia.classList.remove("sugerencia");
            inputSearch.classList.add('search')
            inputSearch.classList.remove("whenSugerencia");
        printSearch(buscarGifs(buscar,"gifs","search",3,0),buscar)
    }
}

function imprimirFavs(array){
let favGifsDivs = document.getElementById('favGifsDiv');
favGifsDivs.classList.add('searches'); //Mismo formato que en el search de index
if(array.length < 1){
    console.log('Sin imagenes favoritas')
    let noFavs = document.createElement('img');
    noFavs.src= 'assets/icon-fav-sin-contenido.svg';
    let div1 = document.createElement('div');
    let favGifsDivs = document.getElementById('favGifsDiv');
    let title = document.createElement('h2');
    title.classList.add('tituloSinGifs')
    title.innerHTML='¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!';
    
    //Properties:
    noFavs.classList.add('icons');
    div1.classList.add('div1');
    
    //DOM:
    div1.appendChild(noFavs);
    div1.appendChild(title)
    favGifsDivs.appendChild(div1);      
}else{
    array.forEach(element=>{
        console.log('Imprimiendo tus favoritos')
        //Elementos:
        let imgDiv = document.createElement('div');
        let img = document.createElement('img');
        let overlay = document.createElement('div');
        let dislike = document.createElement('img'); 
        let download = document.createElement('img'); 
        let maxImg = document.createElement('img');
        let userTitle = document.createElement('h4');
        let gifTitle = document.createElement('h5');
        //Propiedades:
        img.src=element;
        imgDiv.classList.add('newDiv');
        img.classList.add("imgBox"); //"styles/main.scss"
        dislike.classList.add('inserted');
        download.classList.add('inserted');
        maxImg.classList.add('inserted');
        dislike.src= "assets/icon-fav.svg";
        download.src= "assets/icon-download.svg";
        maxImg.src="assets/icon-max-normal.svg";
        gifTitle.classList.add('userYTitle');
        userTitle.classList.add('userYTitle')
        listenerCambioImg(dislike,'mouseover',"assets/icon-fav-hover.svg");
        listenerCambioImg(dislike,'mouseleave',"assets/icon-fav.svg");
        listenerCambioImg(download,'mouseover',"assets/icon-download-hover.svg")
        listenerCambioImg(download,'mouseleave',"assets/icon-download.svg")
        listenerCambioImg(maxImg,'mouseover',"assets/icon-max-hover.svg")
        listenerCambioImg(maxImg,'mouseleave',"assets/icon-max-normal.svg")
        
        //////MOUSEOVER VIOLETA, FAV, DOWNLOAD & MAX
            imgDiv.addEventListener("mouseover",(event)=>{
                if(event){
                    overlay.classList.add('overlayStyle');
                    img.style.zIndex = "-1";
                    imgDiv.style.zIndex = "1";
                //     userTitle.classList.add('userTitle');
                // gifTitle.classList.add('gifTitle')
                overlay.appendChild(dislike);
                overlay.appendChild(download);
                overlay.appendChild(maxImg);
            }
        })
        overlay.addEventListener('mouseleave', (event)=>{
            if(event){
                overlay.classList.remove('overlayStyle');
                gifTitle.classList.remove('gifTitle');
                userTitle.classList.remove('userTitle');
                overlay.removeChild(dislike);
                overlay.removeChild(download);
                overlay.removeChild(maxImg);
            }
        })
        dislike.addEventListener('click',(event)=>{
            let consulta = event.path[2].childNodes[0].currentSrc
            let index = array.indexOf(consulta);
            array.splice(index,1);
            localStorage.setItem('favoritos', JSON.stringify(array));
            favGifsDivs.removeChild(event.path[2])
            console.log(array.length);
            
        })
        //DOM
        imgDiv.appendChild(img);
        imgDiv.appendChild(overlay);
        favGifsDivs.appendChild(imgDiv);
        })
    }
}

textoSugeridos();
