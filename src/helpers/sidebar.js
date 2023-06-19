const Stats = require('./stats');
const Comments = require('./comments');
const Images = require('./images');

module.exports = async (viewModel) => {

    const result = await Promise.all([
        Stats(),
        Images.popular(),
        Comments.newest()
    ]);

    viewModel.sidebar = {
        stats: result[0],
        popular: result[1],
        comments: result[2]
    };

    return viewModel;
}