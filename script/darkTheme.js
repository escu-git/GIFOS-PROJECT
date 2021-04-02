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
}
createGifosBtn.onclick= ()=>{
    window.location = "createGifos.html"
}
logoTheme.onclick= ()=>{
    window.location = "index.html"
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
    }
})
if(setDarkMode === 'on') {
    darkMode();
}
