let arrayMisGifos;
const gifosContainer = document.getElementById('gifosGrabados')

if(localStorage.getItem('misgifos') === null){
    localStorage.setItem('misgifos')
}

if(localStorage.getItem('misgifos').length > 0){
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
        
        printMisGifos(element);
})
}

async function printMisGifos(element){
    let urlMisGifos = `https://api.giphy.com/v1/gifs/${element}?api_key=${apiKey}`;
    let apiGif = await fetch(urlMisGifos);
    let gifo = await apiGif.json();
    console.log(gifo);
    let img = document.createElement('img');
    img.src=gifo.data.images.downsized.url;
    let title = gifo.data.title;
    let user = gifo.data.user;
    console.log(img)
    imprimirMisGifos(img,title,user, element)
    
}

let imprimirDOM= (imagen, titulo, user, id)=>{
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
    gifTitle.classList.add('userYTitle');
    userTitle.classList.add('userYTitle')
    like.classList.add('inserted');
    download.classList.add('inserted');
    maxImg.classList.add('inserted');
    like.src= "assets/icon-fav.svg";
    download.src= "assets/icon-download.svg";
    maxImg.src="assets/icon-max-normal.svg";

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
    listenerCambioImg(like,'mouseover',"assets/icon-fav-hover.svg");
    listenerCambioImg(like,'mouseleave',"assets/icon-fav.svg");
    listenerCambioImg(download,'mouseover',"assets/icon-download-hover.svg")
    listenerCambioImg(download,'mouseleave',"assets/icon-download.svg")
    listenerCambioImg(maxImg,'mouseover',"assets/icon-max-hover.svg")
    listenerCambioImg(maxImg,'mouseleave',"assets/icon-max-normal.svg")

    if(arrayMisGifos.includes(id)){ //Si el array no incluye el gif
        console.log(id)
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
    gifosContainer.appendChild(newDiv);
    newDiv.appendChild(newGif);
    newDiv.appendChild(overlay);
    overlay.appendChild(userTitle);
    overlay.appendChild(gifTitle)
};
