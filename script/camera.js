// navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: false
// }).then(async function(stream) {
    //     let recorder = RecordRTC(stream, {
        //         type: 'video'
        //     });
        //     recorder.startRecording();
        
        //     const sleep = m => new Promise(r => setTimeout(r, m));
        //     await sleep(3000);
        
        //     recorder.stopRecording(function() {
            //         let blob = recorder.getBlob();
            //         invokeSaveAsDialog(blob);
            //     });
            // });
            
var video = document.querySelector('video');
let visualizeVideo = document.getElementById('visualizeVideo');
let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn'); //BOTÓN DETENER GRABACIÓN
let gifVideo = document.getElementById('gifVideo');

//atributos:
gifVideo.classList.add('gifVideo');

function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}

function stopRecordingCallback() {
    video.src = video.srcObject = null;
    // video.muted = false;
    // video.volume = 1;
    video.src = URL.createObjectURL(recorder.getBlob());
    
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

var recorder; // globally accessible
startBtn.addEventListener('click',()=>{
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
});

stopBtn.addEventListener('click', ()=>{
    stopBtn.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
});
