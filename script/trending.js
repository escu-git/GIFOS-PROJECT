
let i;

async function printGifs(){
    let gifs = await trendingRequest(requestType, requestEndpoint, 20);

    for(i=0;i<3;i++){
        const imageDiv = document.createElement('div')
        imageDiv.className='imageDiv';
        const image = document.createElement('img');
        image.classList.add('trendingImages')
        image.src= gifs.data[i].images.downsized.url;
        userTitle.innerHTML = gifs.data[i].username;
        gifTitle.innerHTML = gifs.data[i].title;

        violetLayer.appendChild(like);
        violetLayer.appendChild(download);
        violetLayer.appendChild(maxImg);
        violetLayer.appendChild(userTitle);
        violetLayer.appendChild(gifTitle);
        image.addEventListener('mouseover',event=>{
            violetLayer.classList.add('overlayStyle')
            imageDiv.appendChild(violetLayer)
        })
        imageDiv.appendChild(image);
        trendingImgContainer.appendChild(imageDiv)
    }
}



printGifs()