//VARIABLES
const apiKey ="5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u";

let trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=g`
let leftBtn = document.getElementById('leftBtn');
let rightBtn = document.getElementById('rightBtn');

trendingArray=[];
categoriesArray=[];
let valorInicial=0;

async function api(tipoRequest,limit,rating, arrayPusheado ){
    let apiTrending = await fetch(`https://api.giphy.com/v1/gifs/${tipoRequest}?api_key=${apiKey}&limit=${limit}&rating=${rating}`);
    let toArray = await apiTrending.json();
    toArray.data.forEach(array=>{ //Push to array for Trending.
        arrayPusheado.push(array);
    });
    console.log("api() executed");
};
////////DOM printing
async function printTrending(fnTrending, array, num){
    await fnTrending;
    let div1 = document.getElementById('div1');
    let div2 = document.getElementById('div2');
    let div3 = document.getElementById('div3');
    let img1 = document.createElement('img');
    let img2 = document.createElement('img');
    let img3 = document.createElement('img');
    img1.classList.add("trendingImg")
    img2.classList.add("trendingImg")
    img3.classList.add("trendingImg")
    if(num <0 || num > array.length){ 
        valorInicial = num = 0;
    }
    img1.src = array[num].images.downsized.url;
    img2.src = array[num + 1].images.downsized.url;
    img3.src = array[num + 2].images.downsized.url;
    div1.innerHTML="";
    div2.innerHTML="";
    div3.innerHTML="";

    div1.appendChild(img1);
    div2.appendChild(img2);
    div3.appendChild(img3);
    console.log("api() executed")
};
///////CAMBIO DE IMAGENES EN CAROUSEL
leftBtn.addEventListener('click', (event)=>{
if(event){
    valorInicial++
}
printTrending(api("trending",25,"g"), trendingArray, valorInicial)
console.log(valorInicial)
})
rightBtn.addEventListener('click', (event)=>{
    if(event){
        valorInicial--
    }
    printTrending(api("trending",25,"g"), trendingArray, valorInicial)
})
//--------------------------------------

////////SUGERENCIAS DE TRENDING (texto)
async function textoSugeridos(fnTrending, array){
    await fnTrending
    let sugeridosDiv = document.getElementById('sugeridos');
    let textoTrends = document.createElement('h4');
    textoTrends.innerHTML = `${array[0].name},${array[1].name},${array[2].name},${array[3].name},${array[4].name},${array[5].name}`;
    console.log(textoTrends)
    sugeridosDiv.appendChild(textoTrends)
}
//--------------------------------------


printTrending(api("trending",25,"g",trendingArray),trendingArray, valorInicial)

textoSugeridos(api("searches",10,"g",categoriesArray), categoriesArray)
    