//acá se ejecuta los 'favoritos' de misGifos:
if(localStorage.getItem('misGifos') === null){
    localStorage.setItem('misGifos',"");
//Crear localStorage en caso de no existir.     
}

if(localStorage.getItem('misGifos').length > 0){
    idArray = localStorage.getItem('misGifos')
}else{
    idArray = [];
}

arrayMisGifos = JSON.parse(localStorage.getItem('misGifos'));
console.log(arrayMisGifos)
