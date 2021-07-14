//VARIABLES DARK/CLEAR MODE
const darkModeBtn = document.getElementById("nocturnoDiurnoLi");
const body = document.getElementById("body");
const html = document.getElementById('html');
let diurnoLi = document.getElementById("nocturnoDiurnoLi");
let setDarkMode = localStorage.getItem('darkMode');

//Gifos IMG: Contenedor y creación de IMG con 2 src:
let mainLogo = document.querySelector("div.mainLogo");
let logoTheme =document.createElement("img");
let createGifosBtn = document.getElementById("createGif");
logoTheme.classList.add('logoTheme');
logoTheme.alt="Logo Gifos";
logoTheme.src = "assets/logo-mobile.svg";
mainLogo.appendChild(logoTheme);

const darkMode = ()=>{ //Todos los cambios al hacer dark o clear mode:
    body.classList.toggle('darkMode');
    html.classList.toggle('darkHTML');
    logoTheme.src = "assets/logo-mobile-modo-noct.svg";
    diurnoLi.innerHTML = "Modo Diurno";    
    verMas.src="assets/CTA-ver+-modo-noc.svg";
    listenerCambioImg(verMas,"mouseover","assets/CTA-ver+hover-modo-noc.svg");
    listenerCambioImg(verMas,'mouseleave','assets/CTA-ver+-modo-noc.svg')
}
createGifosBtn.onclick= ()=>{
    window.location = "createGifos.html";
}
logoTheme.onclick= ()=>{
    window.location = "index.html";
}

darkModeBtn.addEventListener('click',()=>{
    setDarkMode = localStorage.getItem('darkMode');

    if(setDarkMode !== "on"){
        darkMode();
        setDarkMode = localStorage.setItem('darkMode', 'on');
    }else{
        darkMode();
        setDarkMode = localStorage.setItem('darkMode', null);
        logoTheme.src = "assets/logo-mobile.svg";
        diurnoLi.innerHTML = "Modo Nocturno";
        verMas.src= 'assets/CTA-ver-mas.svg'
    listenerCambioImg(verMas,"mouseover","assets/CTA-ver-mas-hover.svg");
    listenerCambioImg(verMas,'mouseleave','assets/CTA-ver-mas.svg')
    facebook.src= 'assets/icon_facebook.svg'
    listenerCambioImg(facebook,"mouseover","assets/icon_facebook_hover.svg");
    listenerCambioImg(facebook,"mouseleave","assets/icon_facebook.svg");
    }
})
if(setDarkMode === 'on') {
    darkMode();
}

