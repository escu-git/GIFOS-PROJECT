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
        step = 2;
    }).catch((err)=>console.log(`This is the error: ${err}`))
}

const grabar = () =>{

}