const path = require('path');
const { randomNumber, incrementViews } = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');

const { Image, Comment } = require('../models');
const sidebar = require('../helpers/sidebar');

const ctrl = {};

ctrl.index = async (req, res) => {
    let viewModel = { image: {}, comments: {}}

    const image = await Image.findOne({_id: req.params.image_id}).lean();
    if (image) {
        const imageVIews = await Image.findOne({_id: req.params.image_id});
        /* funcion aumento de views*/
        imageVIews.views = imageVIews.views + 1;
        await imageVIews.save();
        viewModel.image = image;
        const comments = await Comment.find({image_id: req.params.image_id}).lean();
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel);
        res.render("image.hbs", viewModel);
    } else {
        res.redirect('/');
    }
    
};

ctrl.create =  (req, res) => {

        const saveImage = async () => {

            const imgUrl = randomNumber();
            const images = await Image.find({ filename: imgUrl });
            if (images.length > 0) {
                saveImage();
            } else {
                const imageTempPath = req.file.path;
                const ext = path.extname(req.file.originalname).toLowerCase();
                const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
                let confirm = req.body.codigo;
                
                if (confirm == '1234') {

                    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                        await fs.rename(imageTempPath, targetPath);
                        const newImg = new Image({
                            title: req.body.title,
                            filename: imgUrl + ext,
                            description: req.body.description
                        });
                        const imageSaved = await newImg.save();
                        res.redirect('/principal');
                        //res.send('¡Works!'); 
                    } else {
                        await fs.unlink(imageTempPath);
                        res.redirect('/format');
                    }

                } else {
                    res.redirect('/password');
                }
            }
        };

    saveImage();

};

ctrl.like = async (req, res) => {
    const image = await Image.findOne({_id: req.params.image_id});
    if (image) {
        image.likes = image.likes + 1;
        await image.save();
        res.json({likes: image.likes});
    } else {
        res.status(500).json({error: 'Internal Error'});
    }
};

ctrl.comment = async (req, res) => {
    const image = await Image.findOne({_id: req.params.image_id}).lean();
    if(image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/images/' + image._id);
    }
};

ctrl.remove = async (req, res) => {
    const image = await Image.findOne({_id: req.params.image_id});
    const img = image.filename;
    if (image) {
         await fs.unlink(path.resolve('./src/public/upload/' + img));
         await Comment.deleteOne({_id: req.params.image_id});
         await image.deleteOne();

        res.json(true); 
    } 
};

module.exports = ctrl;