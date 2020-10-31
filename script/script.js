
//INSERTIONS IN HTML
    //Gifos img
let mainLogo = document.querySelector("div.mainLogo");
let logoDayMode =document.createElement("img");
logoDayMode.src="assets/logo-mobile.svg";
logoDayMode.alt="Logo Gifos";
mainLogo.appendChild(logoDayMode);

//DARK MODE:

const darkModeBtn = document.getElementById("darkMode");

darkModeBtn.addEventListener("click",(event)=>{
    let themeToggle = document.getElementById("body");
    themeToggle.classList.toggle("darkMode");
})

