const ctrl = {};

const { Image } = require('../models');


ctrl.index = async (req, res) => {
    res.render('main_2.hbs'); 
}

ctrl.error_format = async (req, res) => {
    res.render('error_format.hbs'); 
}

ctrl.error_password = async (req, res) => {
    res.render('error_passsword.hbs'); 
}

ctrl.main = async (req, res) => {
    const images = await Image.find().sort({tiemstamp: -1}).lean();
    let viewModel = {images: []};
    viewModel.images = images;
    console.log(viewModel);
    images.reverse();
    res.render('index.hbs', viewModel); 
}



module.exports = ctrl;