const apiKey ="5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u"; //API KEY para requests.
const createBtn = document.getElementById
var video = document.querySelector('video');
let visualizeVideo = document.getElementById('visualizeVideo');
let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn'); //BOTÓN DETENER GRABACIÓN
let gifVideo = document.getElementById('gifVideo');
let form;
var recorder; // globally accessible

var idArray = []
idArray = localStorage.getItem('id')
if(!localStorage.getItem('id')){
    localStorage.setItem('id',[])
}else{
    idArray = localStorage.getItem('id');
}
//atributos:
gifVideo.classList.add('gifVideo');

//CAPTURAR IMAGEN
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
    // vidOff()
    // localstream.getTracks()[0].stop();
});

uploadBtn.addEventListener('click',async function subirGifo(){
    // enviar gifo.
    await fetch("https://upload.giphy.com/v1/gifs?api_key=5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u", 
    {
        method: 'POST',
        body: form,
        mode:'cors'
    })
    .then(res =>{
        return res.json()})
    .then(res => {
        console.log(res)
        console.log(`api.giphy.com/v1/gifs/gif_id=${res.data.id}&api_key=5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u`)
        fetch(`api.giphy.com/v1/gifs?gif_id=${res.data.id}&api_key=5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u`)
    })
    .then(res =>{
        console.log(`RESPONSE ${res}`)
        res.json()})
    .then(gif =>{
        let newGif = new MYGIFO(idArray.length, "Tu", "Sin titulo",gif.data[0].images.original.url)
        console.log(`Mi nuevo Gif: ${newGif}`)
        idArray.push(newGif);
        localStorage.getItem('id',JSON.stringify(idArray))
    })
    .catch(err => {
        console.log("Éste es el error:", err);
    })
} )


//Apagar cámara después de grabar
// function vidOff() {
    //clearInterval(theDrawLoop);
    //ExtensionData.vidStatus = 'off';
    // camera.pause();
    // camera.src = "";
    // localstream.getTracks()[0].stop();
//     console.log("La cámara fue apagada");
//   }
