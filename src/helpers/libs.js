const helpers = {};

/* Funcion generador codigo imagen */
helpers.randomNumber = () => {

    const possible = 'abcdefghijklmnñopqrstuvwxyz0123456789';
    let randomNumber = 0;
    for (let i = 0; i < 6; i++) {
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomNumber;
}

/* funcion incremento vistas */
helpers.incrementViews = (image) => {
    image.views = image.views + 1;
    return image;
}

module.exports = helpers;