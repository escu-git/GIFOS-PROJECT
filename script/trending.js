//VARIABLES
const apiKey ="5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u";

let trendingGifs = "https://api.giphy.com/v1/gifs/trending?api_key=5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u&limit=25&rating=g"

fetch(trendingGifs)
.then(response => response.json())
.then(arrayGif => arrayGif.data)
.then(arrayArmado =>{
    arrayArmado.forEach(x=>{
        arrayTrending.push(x);
        // let img = x.images.preview_webp.url;
        // let createImg = document.createElement("img");
        // createImg.src = img;
        // createImg.classList.add("trendingGif")
        // let DOM = document.getElementById("trendingDiv");
        // DOM.appendChild(createImg);
    })
})
.catch(error =>{
    console.log("Console log error");
})

//*ARRAY
arrayTrending = [];

//Elements
const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");
const div3 = document.getElementById("div3");

//Create elements
const img = document.createElement("img");


añadirCarrousel(div1, div2, div3)
function añadirCarrousel(div1, div2, div3){
    for(i=0; i<arrayTrending.length;i++){
        img.src = arrayTrending[i].images.downsized_medium.url;
        div1.appendChild(img);
        div2.appendChild(img);
        div3.appendChild(img);
    }
}



