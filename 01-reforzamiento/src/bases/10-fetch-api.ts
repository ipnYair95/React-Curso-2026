import type { IGiphyResponse } from "./data/giphy.response";

const API_KEY = 'qYDj97mDM1yFpIGTl5s4hUrXUCMfv88d';
const myRequest = fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`);

const createImageInsideDom = (url: string) => {

    const img = document.createElement('img');

    img.src = url;

    document.body.append(img);

}

myRequest
    .then(response => response.json())
    .then(({ data }: IGiphyResponse) => {

        const imageUrl = data.images.original.url;

        createImageInsideDom(imageUrl);

    })
    .catch(err => console.error(err));