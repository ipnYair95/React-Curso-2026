import type { IGiphyResponse } from "./data/giphy.response";

const API_KEY = 'asd';

const createImageInsideDom = (url: string) => {

    const img = document.createElement('img');

    img.src = url;

    document.body.append(img);

}

const getImageUrl = async () => {

    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`);

    const data: IGiphyResponse = await response.json();

    return data.data.images.original.url;
    
}

getImageUrl()
    .then(createImageInsideDom);