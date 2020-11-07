
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
    let diurnoLi = document.getElementById("darkMode");
    if(themeToggle.classList.contains("darkMode")){
        logoTheme.src = "assets/logo-mobile-modo-noct.svg";
        diurnoLi.innerHTML = "Modo Diurno";

    }else {
        logoTheme.src = "assets/logo-mobile.svg";
        diurnoLi.innerHTML = "Modo Nocturno";
    }
})

//TRENDING SECTION:

//APIKEY for GIFOS: 5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u
let divTrending = document.getElementById("trending");
//INPUT SEARCH
const inputSearch = document.getElementById("search");


inputSearch.addEventListener("keyup", (event)=>{
    if(event.keyCode === 13){
        buscarGifs(inputSearch.value)
    }
});
//BARRA DE BÚSQUEDA: 
let buscarGifs = (valorDeInput)=> {
let searchGifs = `https://api.giphy.com/v1/gifs/search?api_key=5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u&q=${valorDeInput}&limit=25&offset=0&rating=g&lang=en`;

fetch(searchGifs)
.then(response=>response.json())
.then(response => console.log(response))

.catch(error =>{
    alert("No se encontró nada")

    return searchGifs
})
}
// let imprimirGifs= (buscarGifs()) =>{
//     alert("Hola")
// }
    
// })


