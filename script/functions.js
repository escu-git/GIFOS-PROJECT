//FUNCTIONS

//////////////TRENDING









//////////////SEARCH GIFS
let buscarGifs = (valorDeInput)=> {
    let searchGifs = `https://api.giphy.com/v1/gifs/search?api_key=5STmUZ3Fl2MXPNUrP5Rj8KfP5nAcf84u&q=${valorDeInput}&limit=25&offset=0&rating=g&lang=en`;
    
    fetch(searchGifs)
    .then(response=>response.json())
    .then(array => console.log(array))
    .catch(error =>{
        alert("No se encontró nada")
    })
}