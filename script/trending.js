//VARIABLES
const apiKey ="5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u"; //API KEY para requests.

let trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=g`
let leftBtn = document.getElementById('leftBtn');
let rightBtn = document.getElementById('rightBtn');
rightBtn.classList.add("rightBtn");
leftBtn.classList.add("leftBtn" );
let valorInicial=0; // Para carousel

trendingArray=[]; //Array para printTrending()
categoriesArray=[]; //Array para categorias textoSugeridos()

if(localStorage.getItem('favoritos').length > 0){
    arrayFavoritos = JSON.parse(localStorage.getItem('favoritos'));
}else{
    arrayFavoritos = [];
}

const like = document.createElement('img'); 
const download = document.createElement('img'); 
const maxImg = document.createElement('img');
const userTitle = document.createElement('h4');
const gifTitle = document.createElement('h5');
like.src= "assets/icon-fav.svg";
download.src= "assets/icon-download.svg";
maxImg.src="assets/icon-max-normal.svg";
like.classList.add('inserted');
download.classList.add('inserted');
maxImg.classList.add('inserted');
gifTitle.classList.add('userYTitle');
userTitle.classList.add('userYTitle')

listenerCambioImg(like,'mouseover',"assets/icon-fav-hover.svg");
listenerCambioImg(like,'mouseleave',"assets/icon-fav.svg");
listenerCambioImg(download,'mouseover',"assets/icon-download-hover.svg")
listenerCambioImg(download,'mouseleave',"assets/icon-download.svg")
listenerCambioImg(maxImg,'mouseover',"assets/icon-max-hover.svg")
listenerCambioImg(maxImg,'mouseleave',"assets/icon-max-normal.svg")

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

like.addEventListener('click',(event)=>{
    array = [];
    let consulta = event.path[2].childNodes[0].currentSrc //ACÁ VOLCAR EL OBJETO PARA TOMAR TITULOS Y DEMÁS
    if(arrayFavoritos.includes(consulta)){ //Si el array ya incluye el GIF, lo elimina:
        let index = arrayFavoritos.indexOf(consulta);
        arrayFavoritos.splice(index,1);
        console.log(arrayFavoritos);
    }else{ //Si el array no incluye el GIF, lo suma:
        arrayFavoritos.push(consulta);
        console.log(arrayFavoritos);
    }//Acá se termina la logica de favoritos
    localStorage.setItem('favoritos', JSON.stringify(arrayFavoritos));
})

/////////FUNCION PARA API REQUEST:
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

const violetLayer = document.createElement('div');

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
    console.log('VioletHover () ....')
}

function removeVioletHover(image){
    violetLayer.classList.remove('overlayStyle');
    // gifTitle.classList.remove('gifTitle');
    // userTitle.classList.remove('userTitle');
    violetLayer.removeChild(like);
    violetLayer.removeChild(download);
    violetLayer.removeChild(maxImg);
    console.log('RemoveVioletHover () ....')
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

////////SUGERENCIAS DE TRENDING (texto)
async function textoSugeridos(fnTrending, array){
    await fnTrending
    let sugeridosDiv = document.getElementById('sugeridos');
    let textoTrends = document.createElement('h4');
    textoTrends.innerHTML = `${array[0]}, ${array[1]}, ${array[2]}, ${array[3]}, ${array[4]}.`;
    sugeridosDiv.appendChild(textoTrends)
    
}
//---------------------------------------

printTrending(api("gifs","trending",9,trendingArray),trendingArray, valorInicial)

textoSugeridos(api("trending","searches",5,categoriesArray), categoriesArray);