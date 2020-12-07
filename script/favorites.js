imprimirFavs(arrayFavoritos);

    //ELIMINAR DE FAVORITO






    // dislike.addEventListener('click',(event)=>{
    //     console.log(event.path[2].childNodes[0].currentSrc)
    //     array = [];
    //     let consulta = event.path[2].childNodes[0].currentSrc //ACÁ VOLCAR EL OBJETO PARA TOMAR TITULOS Y DEMÁS
    //     if(arrayFavoritos.includes(consulta)){ //Si el array incluye el GIF, lo borramos
    //         let index = arrayFavoritos.indexOf(consulta);
    //         arrayFavoritos.splice(index,1);
    //         favGifsDivs.removeChild(event.path[1])
    //         console.log(arrayFavoritos.length);
    //     }//Acá se termina la logica de favoritos
    //     localStorage.setItem('favoritos', JSON.stringify(arrayFavoritos));
    // })