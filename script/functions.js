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

//Downloading GIFS:
const downloadGif = async(event) =>{
    let a = document.createElement('a');
        let response = await fetch(event.path[2].childNodes[0].currentSrc);
        let file = await response.blob();
        a.download= 'downloadedGif';
        a.href = window.URL.createObjectURL(file);
        a.dataset.downloadurl = ['application/octec-stream', a.download, a.href].join(':');
        a.click()
}

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

function listenerCambioImg(objeto,accion,imagen){
    objeto.addEventListener(accion,(event)=>{
        objeto.src=imagen
    })
};




const trendingRequest = async(request, endpoint,limit, valorInicial)=>{
    let url = `https://api.giphy.com/v1/${request}/${endpoint}?api_key=${apiKey}&limit=${limit}&offset=${valorInicial}&rating=g`;
    try{
        let fetched= await fetch(url);
        return await fetched.json();
    }
    catch(err){
        console.log(err)
    }
}

async function textoSugeridos(){ //--> Sugerencias
    let text = await trendingRequest('trending', 'searches', 5)
    let sugeridosDiv = document.getElementById('sugeridos');
    sugeridosDiv.classList.add('sugeridosDiv')
    for(i=0;i<5;i++){
        let texto = document.createElement('h3');
        texto.setAttribute('class','textoTrending')
        texto.innerHTML = `${text.data[i]}`;
        console.log(texto)
        sugeridosDiv.appendChild(texto)
        texto.addEventListener('click',(event)=>{
            let currentQuery = event.path[0].innerHTML
            printSearch(buscarGifs(currentQuery,"gifs","search",3,0),currentQuery);//
        })
        texto.addEventListener('mouseover',(event)=>{
            texto.style.cursor = 'pointer';
        })
    }
};

