const createBtn = document.getElementById
var video = document.querySelector('video');
let visualizeVideo = document.getElementById('visualizeVideo');
let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn'); //BOTÓN DETENER GRABACIÓN
let gifVideo = document.getElementById('gifVideo');
let form;
var recorder; // globally accessible

// localStorage.setItem('misGifos',"");
var idArray =[];

<<<<<<< HEAD
if(!localStorage.getItem('id')){
    localStorage.setItem('id',[])
}else{
    idArray == localStorage.getItem('id');
}
//atributos:
gifVideo.classList.add('gifVideo');

//CAPTURAR IMAGEN
=======
let idArray;

//atributos:
gifVideo.classList.add('gifVideo');

if(localStorage.getItem('misGifos') === null){
    localStorage.setItem('misGifos',"");
    //Crear localStorage en caso de no existir.     
}

if(localStorage.getItem('misGifos').length = 0){
    idArray = localStorage.getItem('misGifos');
}else{
    idArray = [];
}

>>>>>>> 79a0d82b830159f3c9bbc74bcfea4f55579c7c65
function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ 
        audio: false, 
        video: {
            height: { max: 480 }
        }   
    }).then(function(camera) {
        callback(camera);
        console.log("Se encendió la cámara")
    }).catch(function(error) {
        alert('No se pudo capturar video, revisar console.error');
        console.error(error);
    });
}
//DETENER GRABACIÓN
function stopRecordingCallback() {
    // video.src = video.srcObject = null;
    // video.muted = false;
    const mediaStream = video.srcObject;
    const tracks = mediaStream.getTracks();
    // video.volume = 1;
    tracks.forEach(track=> track.stop());
    let blob = recorder.getBlob();
    video.src = URL.createObjectURL(blob);
    
    form = new FormData();
    form.append('file', blob, 'myGif.gif');
    console.log("ESTE ES EL FILE!!!!", form.get('file'));

    //recorder.camera.stop();
    recorder.destroy();
    recorder = null;
    console.log("Se detuvo la grabación")
}
//COMENZAR GRABACION
btnInicio.addEventListener('click',()=>{
    this.disabled = true;
    captureCamera(camera=> { //CALLBACK QUE PROCESA EL VIDEO
        // video.muted = true;
        // video.volume = 0;
        video.srcObject = camera;

        video.play();  

        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() {
                console.log('grabacion iniciada')
            }
        });
    });
});

startBtn.addEventListener('click', ()=>{
    recorder.startRecording();
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', ()=>{
    stopBtn.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
    vidOff()
});

uploadBtn.addEventListener('click',()=>{
    // enviar gifo.
    fetch("https://upload.giphy.com/v1/gifs?api_key=5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u", 
    {
        method: 'POST',
        body: form
    })
    .then(res => res.json())
    .then(res => {
<<<<<<< HEAD
        console.log("Se envío a GIPHY:", res.data.id);
        idArray.push(res.data.id);
        localStorage.setItem('id',idArray)
        console.log(idArray);
=======
        let temporal = JSON.stringify(res.data.id);
        console.log("Se envío a GIPHY:", temporal);

        idArray.push(temporal)
        console.log(idArray)
        localStorage.setItem('misGifos', JSON.stringify(idArray));
>>>>>>> 79a0d82b830159f3c9bbc74bcfea4f55579c7c65
    })
    .catch(err => {
        console.log("error.!!!", err);
    })
<<<<<<< HEAD
} )


//Apagar cámara después de grabar
function vidOff() {
    //clearInterval(theDrawLoop);
    //ExtensionData.vidStatus = 'off';
    camera.pause();
    camera.src = "";
    localstream.getTracks()[0].stop();
    console.log("La cámara fue apagada");
  }
=======
} )
>>>>>>> 79a0d82b830159f3c9bbc74bcfea4f55579c7c65
