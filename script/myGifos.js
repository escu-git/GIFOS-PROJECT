let arrayMisGifos;

if(localStorage.getItem('misgifos') === null){
    localStorage.setItem('misgifos',"")
}

if(localStorage.getItem('gifos').length > 0){
    arrayMisGifos = JSON.parse(localStorage.getItem('misgifos'));
}else{
    arrayMisGifos = [];
}

if(arrayMisGifos.length == 0){
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
        printMisGifos(JSON.stringelement);
})
}

async function printMisGifos(gifId){
    console.log(gifId);
    let urlMisGifos = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${gifId}`;
    let apiGif = await fetch(urlMisGifos);
    console.log(apiGif);
    let img = document.createElement('img');
}