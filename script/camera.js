const mainScreen = document.getElementById('mainScreen');
const gifVideo = document.getElementById('gifVideo');
const numbersContainer = document.getElementById('numbersContainer');
const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');
const circle3 = document.getElementById('circle3');
const btnAction = document.getElementById('btnAction');
const btnGrabar = document.getElementById('btnAction');
const mainScreenTitle = document.getElementById('mainScreenTitle');
const mainScreenText = document.getElementById('mainScreenText');
var recorder;

let step = 1;
btnAction.innerHTML='COMENZAR';
gifVideo.className='dontShow';
mainScreenTitle.className='showTitle';

btnAction.addEventListener('click',event=>{
    switch(step){
        case 1: comenzar();
        break;
        case 2: grabar();
        break;
    }
})

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

const comenzar = () =>{
    console.log('Comenzar was clicked')
    btnAction.className='dontShow';
    circle1.classList='nextStep'
    mainScreenTitle.innerHTML='¿Nos das acceso a tu cámara?';
    mainScreenText.innerHTML='El acceso a tu cámara será válido sólo por el tiempo en el que estés creando el GIFO.'
    navigator.mediaDevices.getUserMedia({ video: {height: { max: 480 }} , audio: false }).then(function(camera){
        mainScreenTitle.style.display='none';
        mainScreenText.style.display='none';
        gifVideo.className='showGifVideo';
        console.log('Camera is on.......')
        document.getElementById('gifVideo').muted = true;
        document.getElementById('gifVideo').srcObject = camera;
        btnAction.innerHTML='Grabar';
        btnAction.className='btnAction';
        step = 2;
    }).catch((err)=>console.log(`This is the error: ${err}`))
}

const grabar = () =>{
    console.log('Grabar started')
    navigator.mediaDevices.getUserMedia({ 
        audio: false, 
        video: {
            height: { max: 480 }
        }   
    }).then(camera=> { 
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
}