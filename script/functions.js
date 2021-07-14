const facebook = document.getElementById('facebook');
const twitter = document.getElementById('twitter');
const instagram = document.getElementById('instagram');

facebook.addEventListener('mouseover',()=>{
    facebook.style.cursor= 'pointer'
    facebook.style.animation =''
})

facebook.addEventListener('click',(event)=>{
    let link = document.createElement('a')
    link.href= "https://www.facebook.com"
    link.click()
})

twitter.addEventListener('mouseover',()=>{
    twitter.style.cursor= 'pointer'
})

twitter.addEventListener('click',(event)=>{
    let link = document.createElement('a');
    link.href= "https://www.twitter.com";
    link.click()
})

instagram.addEventListener('mouseover',()=>{
    instagram.style.cursor= 'pointer'
})

instagram.addEventListener('click',(event)=>{
    let link = document.createElement('a')
    link.href= "https://www.instagram.com"
    link.click()
})

function listenerCambioImg(objeto,accion,imagen){
    objeto.addEventListener(accion,(event)=>{
        objeto.src=imagen
    })
};