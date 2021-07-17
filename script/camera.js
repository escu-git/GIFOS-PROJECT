const mainScreen = document.getElementById('mainScreen');
const gifVideo = document.getElementById('gifVideo');
const numbersContainer = document.getElementById('numbersContainer');
const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');
const circle3 = document.getElementById('circle3');
const btnAction = document.getElementById('btnAction');
const btnGrabar = document.getElementById('btnAction');
const timeCounter = document.getElementById('timeCounter');
const gifReady = document.getElementById('gifReady');
const mainScreenTitle = document.getElementById('mainScreenTitle');
const mainScreenText = document.getElementById('mainScreenText');
const corner1 = document.createElement('div');
const corner2 = document.createElement('div');
const corner3 = document.createElement('div');
const corner4 = document.createElement('div');
corner1.className='corner1';
corner2.className='corner2';
corner3.className='corner3';
corner4.className='corner4';
mainScreen.append(corner1, corner2, corner3, corner4);
let recorder;
let dateStarted;
let form = new FormData();
let userGifos;
if(userGifos === null) userGifos=localStorage.setItem('userGifos',[])
btnAction.innerHTML='COMENZAR';
gifVideo.className='dontShow';
mainScreenTitle.className='showTitle';

let step = 1;
btnAction.addEventListener('click',event=>{
    switch(step){
        case 1: comenzar();
        break;
        case 2: startVideo();
        break;
        case 3: stopVideo();
        break;
        case 4: uploadGif();
        break;
    }
})


const comenzar = () =>{
    console.log('Comenzar was clicked')
    btnAction.className='dontShow';
    circle1.classList='nextStep'
    mainScreenTitle.innerHTML='¿Nos das acceso a tu cámara?';
    mainScreenText.innerHTML='El acceso a tu cámara será válido sólo por el tiempo en el que estés creando el GIFO.'
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          height: { max: 480 },
          width: { max: 480 }
        }
    
      }).then(function(camera){
        mainScreenTitle.style.display='none';
        mainScreenText.style.display='none';
        gifVideo.className='showGifVideo';
        console.log('Camera is on.......')
        gifVideo.muted = true;
        gifVideo.srcObject = camera;
        btnAction.innerHTML='Grabar';
        btnAction.className='btnAction';

        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function () {
              console.log('started')
            },
        });
        step = 2;
    }).catch((err)=>console.log(`This is the error: ${err}`))
}

const startVideo = () =>{
    recorder.startRecording();
    btnAction.innerHTML='Finalizar';
    circle2.className='nextStep';
    timeCounter.className='timeCounter';

    timeRecording = new Date().getTime();

    (function looper() {
        if (!recorder || step==4) {
          return;
        }

        timeCounter.innerHTML = calculateTimeDuration(
          (new Date().getTime() - timeRecording) / 1000
        );
        setTimeout(looper, 1000);
      })();

    step=3;
}

const stopVideo = () =>{
    btnAction.innerHTML='SUBIR GIFO';
    timeRecording=calculateTimeDuration(null)
    timeCounter.innerHTML='REINTENTAR';
    recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        gifVideo.style.display='none';
        gifReady.className='showGifVideo';
        gifReady.src = URL.createObjectURL(recorder.getBlob());
    
        form.append("file", blob, "myGifo.gif");
        form.append("api_key", apiKey);
      })
      step=4;
};

const uploadGif = () =>{
    circle3.className='nextStep'
    // btnAction.style.display='none';
    fetch(`https://upload.giphy.com/v1/gifs`, {
    method: "POST",
    body: form,
  }).then((res) => {
    return res.json();
  }).then((res) => {
    var gifId = res.data.id;
    misgifos = localStorage.getItem('misgifos');
    if (misgifos == null) {
      misgifos = [];
    } else {
      misgifos = JSON.parse(misgifos);
    }
    misgifos.push(gifId);
    
    localStorage.setItem('misgifos', JSON.stringify(misgifos));

  })
}


function calculateTimeDuration(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - hr * 3600) / 60);
    var sec = Math.floor(secs - hr * 3600 - min * 60);
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    return hr + ":" + min + ":" + sec;
  }