//Botón DARK/LIGHT MODE:
const darkModeBtn = document.getElementById("darkMode");

//Gifos IMG: Contenedor y creación de IMG con 2 src:
let mainLogo = document.querySelector("div.mainLogo"); 
let logoTheme =document.createElement("img");
let body = document.getElementById("body");
let createGifosBtn = document.getElementById("createGif");
logoTheme.classList.add('logoTheme');
logoTheme.alt="Logo Gifos";
logoTheme.src = "assets/logo-mobile.svg";
mainLogo.appendChild(logoTheme);

createGifosBtn.onclick= ()=>{
    window.location = "createGifos.html"
}
logoTheme.onclick= ()=>{
    window.location = "index.html"
}
darkModeBtn.addEventListener("click",(event)=>{
    let themeToggle = document.getElementById("body");
    let html = document.getElementById("html");
    let dark = themeToggle.classList.toggle("darkMode");
    html.classList.toggle("darkHTML")

    //LOCAL STORAGE: 
    localStorage.setItem('darkMode',dark)

    //Cambio de logo según theme
    let diurnoLi = document.getElementById("darkMode");
    
    if(localStorage.getItem('darkMode' == "true")){
        logoTheme.src = "assets/logo-mobile-modo-noct.svg";
        diurnoLi.innerHTML = "Modo Diurno";
    }else{
        logoTheme.src = "assets/logo-mobile.svg";
        diurnoLi.innerHTML = "Modo Nocturno";
    }
    
    
    
    
    
    
    
    // if(themeToggle.classList.contains("darkMode")){
    //     logoTheme.src = "assets/logo-mobile-modo-noct.svg";
    //     diurnoLi.innerHTML = "Modo Diurno";

    // }else {
    //     logoTheme.src = "assets/logo-mobile.svg";
    //     diurnoLi.innerHTML = "Modo Nocturno";
    // }
});

