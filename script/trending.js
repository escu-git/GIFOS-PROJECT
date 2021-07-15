//VARIABLES

rightBtn.classList.add("rightBtn");
leftBtn.classList.add("leftBtn" );
let valorInicial=0; // Para carousel

trendingArray=[]; //Array para printTrending()
categoriesArray=[]; //Array para categorias textoSugeridos()

let favoritosArray
if(localStorage.getItem('favoritos').length > 0){
    favoritosArray = JSON.parse(localStorage.getItem('favoritos'));
}else{
    favoritosArray = [];
}

like.src= "assets/icon-fav.svg";
download.src= "assets/icon-download.svg";
maxImg.src="assets/icon-max-normal.svg";
like.classList.add('inserted');
like.setAttribute('id', 'like');
download.classList.add('inserted');
download.setAttribute('id','download');
maxImg.classList.add('inserted');
maxImg.setAttribute('id','maxImg');
gifTitle.classList.add('userYTitle');
userTitle.classList.add('userYTitle')

listenerCambioImg(like,'mouseover',"assets/icon-fav-hover.svg");
listenerCambioImg(like,'mouseleave',"assets/icon-fav.svg");
listenerCambioImg(download,'mouseover',"assets/icon-download-hover.svg")
listenerCambioImg(download,'mouseleave',"assets/icon-download.svg")
listenerCambioImg(maxImg,'mouseover',"assets/icon-max-hover.svg")
listenerCambioImg(maxImg,'mouseleave',"assets/icon-max-normal.svg")

download.addEventListener('click',(event)=>{
    downloadGif(event)
});

maxImg.addEventListener('click',(event)=>{
    //Create elements:
    let body = document.getElementById('body');
    let agrandarImg = document.createElement('div')
    let img = document.createElement('img')
    let exit = document.createElement('img');
    let divInfo = document.createElement('div');
    let userTitleAgrandar = document.createElement('h4');
    let gifTitleAgrandar = document.createElement('h5');
    like.style.gridArea = 'like';
    download.style.gridArea = 'download';
    console.log(event.path[2].children)
    //Atributos:
    // userTitleAgrandar.innerHTML=event.path[2].children[0];
    // gifTitleAgrandar.innerHTML=event.path[2].children[0]
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
    gifTitle.classList.add('gifTitleAgrandar');
    mainLogo.src='assets/logo-mobile.svg';
    mainLogo.style.opacity='50%';
    //DOM:
    divInfo.appendChild(userTitleAgrandar);
    divInfo.appendChild(gifTitleAgrandar);
    divInfo.appendChild(like);
    divInfo.appendChild(download);
    agrandarImg.appendChild(img);
    agrandarImg.appendChild(exit);
    agrandarImg.appendChild(divInfo);
    agrandarImg.appendChild(mainLogo);
    body.appendChild(agrandarImg);
})

like.addEventListener('click',(event)=>{
    array = [];
    let consulta = event.path[2].childNodes[0].currentSrc;
    if(favoritosArray.includes(consulta)){ //Si el array ya incluye el GIF, lo elimina: 
        let index = favoritosArray.indexOf(consulta);
        favoritosArray.splice(index,1);
        console.log("Estos son tus favoritos:"+favoritosArray);
        showLikes(event.path[1].offsetParent,"¡Eliminado de favoritos!");
    }else{ //Si el array no incluye el GIF, lo suma:
        favoritosArray.push(consulta);
        console.log("Estos son tus favoritos:"+favoritosArray);
        showLikes(event.path[1].offsetParent,"¡Añadido a favoritos!");
    }//Acá se termina la logica de favoritos
    localStorage.setItem('favoritos', JSON.stringify(favoritosArray));
})

//*FUNCION PARA API REQUEST:
async function api(tipoRequest1, tipoRequest2,limit,arrayToPush){
    //tipoRequest1: gifs / trending
    //tipoRequest2: searches / categories / "search/tags"
    let apiTrending = await fetch(`https://api.giphy.com/v1/${tipoRequest1}/${tipoRequest2}?api_key=${apiKey}&limit=${limit}&rating=g`);
    let toArray = await apiTrending.json();
    toArray.data.forEach(array=>{ //Push to array for Trending.
    arrayToPush.push(array);
    });
};
//--------------------------------



////////DOM printing
async function printTrending(fnTrending, array, num){    
    await fnTrending;

    let img1 = document.getElementById('img1');
    img1.appendChild(violetLayer);
    let img2 = document.getElementById('img2');
    img2.appendChild(violetLayer);
    let img3 = document.getElementById('img3');
    img3.appendChild(violetLayer);
    
    img1.classList.add("trendingImg");
    img2.classList.add("trendingImg");
    img3.classList.add("trendingImg");
    
    if(num <0 || num > array.length){ 
        valorInicial = num = 0;
    }
    console.log(array)
    img1.src="";
    img2.src="";
    img3.src="";
    img1.src = array[num].images.downsized.url;
    img2.src = array[num + 1].images.downsized.url;
    img3.src = array[num + 2].images.downsized.url;
    
};
img1.addEventListener('mouseover',(event)=>{
    violetHover(event.target)
})
img2.addEventListener('mouseover',(event)=>{
    violetHover(event.target)
})
img3.addEventListener('mouseover',(event)=>{
    violetHover(event.target)
})
violetLayer.addEventListener('mouseleave',(event)=>{
    removeVioletHover(event)
})

function violetHover(image){
    image.parentNode.style.position = 'relative'
    image.parentNode.appendChild(violetLayer)
    violetLayer.classList.add('overlayStyle');
    image.style.zIndex = "-1";
    // newDiv.style.zIndex = "1";
    // userTitle.classList.add('userTitle');
    // gifTitle.classList.add('gifTitle')
    violetLayer.appendChild(like);
    violetLayer.appendChild(download);
    violetLayer.appendChild(maxImg);
}

function removeVioletHover(image){
    violetLayer.classList.remove('overlayStyle');
    // gifTitle.classList.remove('gifTitle');
    // userTitle.classList.remove('userTitle');
    violetLayer.removeChild(like);
    violetLayer.removeChild(download);
    violetLayer.removeChild(maxImg);
}
//-----------------------------------

///////CAMBIO DE IMAGENES EN CAROUSEL
leftBtn.addEventListener('click', (event)=>{
if(event){
    valorInicial++
}
printTrending(api("gifs","trending",25,trendingArray), trendingArray, valorInicial)
console.log(valorInicial)
})
rightBtn.addEventListener('click', (event)=>{
    if(event){
        valorInicial--
    }
    printTrending(api("gifs","trending",25,trendingArray), trendingArray, valorInicial)
})
//--------------------------------------


printTrending(api("gifs","trending",9,trendingArray),trendingArray, valorInicial)

textoSugeridos(api("trending","searches",5,categoriesArray), categoriesArray);

function listenerCambioImg(objeto,accion,imagen){
    objeto.addEventListener(accion,(event)=>{
        objeto.src=imagen
    })
};

function showLikes(target, mensaje){
    let messageContainer = document.createElement('div');
    let message = document.createElement('h5');

    messageContainer.setAttribute("style", "opacity:95%; width: 55px; height: 55px; background-color: #572EE5; border-radius:50px; position:absolute; top:0px; left:-60px; padding:2px");
    messageContainer.setAttribute("id","messageContainer");
    message.setAttribute("style","font-size:9px; color:white")
    message.innerHTML = `${mensaje}`

    messageContainer.appendChild(message);
    target.appendChild(messageContainer);
    setTimeout(unshowLikes,2000)
};

function unshowLikes(){
    let mensaje = document.getElementById('messageContainer');
    mensaje.remove()
};