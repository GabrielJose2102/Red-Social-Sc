/* contenedor funciones */
const ctrl = {};

const { Image } = require('../models');

/* Inicializacion pantalla vista */
ctrl.index = async (req, res) => {
    res.render('main_2.hbs'); 
}

/* Inicializacion pantalla error formato */
ctrl.error_format = async (req, res) => {
    res.render('error_format.hbs'); 
}

/* Inicializacion pantalla error contraseña */
ctrl.error_password = async (req, res) => {
    res.render('error_passsword.hbs'); 
}


/* Inicializacion pantalla principal */
ctrl.main = async (req, res) => {
    const images = await Image.find().sort({tiemstamp: -1}).lean();
    let viewModel = {images: []};
    viewModel.images = images;
    console.log(viewModel);
    images.reverse();
    res.render('index.hbs', viewModel); 
}



module.exports = ctrl;