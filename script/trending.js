let valorInicial = 0;


let i;
async function printGifs(requestType, requestEndpoint, i, valorInicial){
    let gifs = await trendingRequest(requestType, requestEndpoint, i, valorInicial);
    for(i=0;i<3;i++){
        const imageDiv = Object.assign(document.createElement('div'),{
            id:'imageDiv',
            class:'imageDiv'
        });
        const image = Object.assign(document.createElement('img'),{
            class:'trendingImages',
            src:gifs.data[i].images.downsized.url,
            onmouseover:('mouseover',event=>{
                layer.classList.add('overlayStyle')
                imageDiv.appendChild(layer)
            }),
        })
        const layer = Object.assign(document.createElement('div'),{
            class:'overlayStyle',
            onmouseleave:('mouseleave',event=>{
                    layer.classList.remove('overlayStyle');
                    imageDiv.removeChild(layer);
            }),
        })
        const like = Object.assign(document.createElement('img'),{
            class:'inserted',
            src: "assets/icon-fav.svg",
            onclick:('click', event=>{
                console.log('hola')
            }),
            onmouseover:('mouseover',event=>{
                listenerCambioImg(like,'mouseover',"assets/icon-fav-hover.svg")
            }),
            onmouseleave:('mouseleave',event=>{
                listenerCambioImg(like,'mouseleave',"assets/icon-fav.svg")
            })
        })
        const download = Object.assign(document.createElement('img'),{
            class:'inserted',
            src:'assets/icon-download.svg',
            onclick: ('click',event=> downloadGif(event)),
            onmouseover:('mouseover',event=> {
                listenerCambioImg(download,'mouseover','assets/icon-download-hover.svg')
            }),
            onmouseleave:('mouseleave',event=>{
                listenerCambioImg(download,'mouseleave','assets/icon-download.svg')
            })
        });
        const maxImg = Object.assign(document.createElement('img'),{
            class:'inserted',
            src:'assets/icon-max-normal.svg',
            onclick:('click',event=>{
                
            }),
            onmouseover:('mouseover',event=>{
                listenerCambioImg(maxImg,'mouseover',"assets/icon-max-hover.svg");
            }),
            onmouseleave:('mouseleave',event=>{
                listenerCambioImg(maxImg,'mouseleave',"assets/icon-max-normal.svg");
            })
        })
        const title = Object.assign(document.createElement('span'),{
            innerHTML: gifs.data[i].title,
            class: 'gifTitle'
        })
        const user = Object.assign(document.createElement('span'),{
            innerHTML: gifs.data[i].username,

        })
        imageDiv.className='imageDiv';
        image.classList.add('trendingImages');
        layer.append(like, download, maxImg, title, user);
        imageDiv.appendChild(image);
        trendingImgContainer.appendChild(imageDiv);
    }
}

leftBtn.addEventListener('click', (event)=>{
    if(event){
        valorInicial++
    }
    if(trendingImgContainer.childElementCount !=0)trendingImgContainer.innerHTML='';
    if(valorInicial > 16) valorInicial=16;
    printGifs(request, requestEnd, 18, valorInicial)
    })
    rightBtn.addEventListener('click', (event)=>{
        if(event){
            valorInicial--
        }
        if(trendingImgContainer.childElementCount !=0)trendingImgContainer.innerHTML='';
        if(valorInicial < 0) valorInicial=0;
        printGifs(request, requestEnd, 18, valorInicial)
    })

    let request = 'gifs';
    let requestEnd = 'trending';

printGifs(request, requestEnd, i, valorInicial)