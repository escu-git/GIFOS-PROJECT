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

////////DOM printing
async function printTrending(fnTrending, array, num){    
    await fnTrending;

    let img1 = document.getElementById('img1');
    let img2 = document.getElementById('img2');
    let img3 = document.getElementById('img3');
    
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

function violetHover(img){
    let overlay = document.createElement('div');

    img.addEventListener('hover',(event)=>{
        overlay.classList.add('overlayStyle')
    })
    
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

//Eliminar boton DERECHO - Cuando img1 = 1
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

textoSugeridos(api("trending","searches",5,categoriesArray), categoriesArray)
