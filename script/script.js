
//Botón DARK/LIGHT MODE:
const darkModeBtn = document.getElementById("darkMode");

//Gifos IMG: Contenedor y creación de IMG con 2 src:
let mainLogo = document.querySelector("div.mainLogo"); 
let logoTheme =document.createElement("img");
logoTheme.alt="Logo Gifos";
logoTheme.src = "assets/logo-mobile.svg";
let body = document.getElementById("body");
mainLogo.appendChild(logoTheme);

    
darkModeBtn.addEventListener("click",(event)=>{
    let themeToggle = document.getElementById("body");
    themeToggle.classList.toggle("darkMode");
    //Cambio de logo según theme
    if(themeToggle.classList.contains("darkMode")){
        logoTheme.src = "assets/logo-mobile-modo-noct.svg"
    }else {
        logoTheme.src = "assets/logo-mobile.svg"
    }
})
