const gifosContainer = document.getElementById('gifosGrabados')
let arrayMisGifos = localStorage.getItem('id');

if(localStorage.getItem('id')){
arrayMisGifos.forEach(element=>{
    printMisGifos(element)
})
}else{
    //UBICAR ACÁ LA IMAGEN DE QUE NO HAY GIFOS PROPIOS
}




async function printMisGifos(GifId){
    let urlMisGifos = `api.giphy.com/v1/gifs/${gifId}`
    let response = await fetch(urlMisGifos)
    console.log(response)
    let img = document.createElement('img');
}