const myPromise = new Promise<number>((resolve, reject) => {

    setTimeout(() => {
        reject('no tengo mi dinero');
    }, 2000);

});

myPromise.then((value) => {
    console.log(`tengo mi dinero ${value}`)
}).catch(err => console.warn(err))
    .finally(() => console.log('finalizo'))