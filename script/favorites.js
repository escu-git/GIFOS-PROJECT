let array;

if(localStorage.getItem('favoritos').length > 0){
    array = JSON.parse(localStorage.getItem('favoritos'));
}else{
    array = [];
}

imprimirFavs(array)

//!SOLUCIONAR: 
    // AL MOMENTO DE LIKEAR, QUE SE ACTUALICE EN TIEMPO REAL FAVORITOS.