let arrayMisGifos = [localStorage.getItem('id')]
if(localStorage.getItem('id') === null){
    localStorage.setItem('id',"") //Esto chequea si la key 'id' existe en localStorage, caso contrario, la crea.
}

if(arrayMisGifos.length <0){
    console.log('Sin imagenes favoritas')
    let gifosContainer = document.getElementById('gifosGrabados')
    gifosContainer.classList.add('searches');
    let noGifos = document.createElement('img');
    noGifos.src= 'assets/icon-mis-gifos-sin-contenido.svg';
    let div2 = document.createElement('div');
    let title = document.createElement('h2');
    title.classList.add('tituloSinGifs')
    title.innerHTML='¡Anímate a crear tu primer GIFO!';
    //properties:
    noGifos.classList.add('icons');
    div2.classList.add('div1');
    //DOM:
    div2.appendChild(noGifos);
    div2.appendChild(title)
    gifosContainer.appendChild(div2);
}else{
    arrayMisGifos.forEach(element=>{
        printMisGifos(element);
})
}

async function printMisGifos(gifId){
    console.log(apiKey);
    console.log(gifId);
    let urlMisGifos = `api.giphy.com/v1/gifs/gif_id=${gifId}?api_key=${apiKey}`;
    let apiGif = await fetch(urlMisGifos);
    console.log(apiGif);
    let img = document.createElement('img');

}