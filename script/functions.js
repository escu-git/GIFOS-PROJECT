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
