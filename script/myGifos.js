const gifosContainer = document.getElementById('gifosGrabados')
let arrayMisGifos = [localStorage.getItem('id')]
let arrayPrueba = ['hola','chau']
if(localStorage.getItem('id')){
arrayMisGifos.forEach(element=>{
    printMisGifos(element);
})
}else{
    //UBICAR ACÁ LA IMAGEN DE QUE NO HAY GIFOS PROPIOS
}

async function printMisGifos(gifId){
    console.log(apiKey)
    let urlMisGifos = `api.giphy.com/v1/gifs/${gifId}?api_key=${apiKey}`
    let apiGif = await fetch(urlMisGifos)
    console.log(apiGif)
    let img = document.createElement('img');
}