const createBtn = document.getElementById
var video = document.querySelector('video');
let visualizeVideo = document.getElementById('visualizeVideo');
let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn'); //BOTÓN DETENER GRABACIÓN
let gifVideo = document.getElementById('gifVideo');
let form;

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

function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ 
        audio: false, 
        video: {
            height: { max: 480 }
        }   
    }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}

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
}

var recorder; // globally accessible
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
            },
        });

        // recorder = RecordRTC(camera, {
        //     type: 'video'
        // });

        // recorder.startRecording();

        // // release camera on stopRecording
        // recorder.camera = camera;

        //stopBtn.disabled = false;
    });
});

startBtn.addEventListener('click', ()=>{
    recorder.startRecording();
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', ()=>{
    stopBtn.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
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
        let temporal = JSON.stringify(res.data.id);
        console.log("Se envío a GIPHY:", temporal);

        idArray.push(temporal)
        console.log(idArray)
        localStorage.setItem('misGifos', JSON.stringify(idArray));
    })
    .catch(err => {
        console.log("error.!!!", err);
    })
} )