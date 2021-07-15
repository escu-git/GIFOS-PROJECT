

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
        console.log('DarkMode on')
        setDarkMode = localStorage.setItem('darkMode', 'on');
        facebook.src='assets/icon_facebook_noc.svg'
    }else{
        console.log('DarkMode off')
        darkMode();
        setDarkMode = localStorage.setItem('darkMode', null);
        logoTheme.src = "assets/logo-mobile.svg";
        diurnoLi.innerHTML = "Modo Nocturno";
        verMas.src= 'assets/CTA-ver-mas.svg'
    listenerCambioImg(verMas,"mouseover","assets/CTA-ver-mas-hover.svg");
    listenerCambioImg(verMas,'mouseleave','assets/CTA-ver-mas.svg')
    listenerCambioImg(facebook,"mouseover","assets/icon_facebook_hover.svg")
    listenerCambioImg(twitter,"mouseover","assets/icon_twitter_hover.svg");
    listenerCambioImg(facebook,"mouseleave","assets/icon_facebook.svg");
    }
})
if(setDarkMode === 'on') {
    darkMode();
}

