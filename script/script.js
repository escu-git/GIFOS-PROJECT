//SEARCH SECTION:
const divSearch = document.getElementById("searches");
//INPUT SEARCH
const inputSearch = document.getElementById("search");


inputSearch.addEventListener("keyup", (event)=>{
    if(event.keyCode === 13){
        buscarGifs(inputSearch.value);
    }
});



