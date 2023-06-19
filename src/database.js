const mongoose = require(`mongoose`);

const { database } = require('./keys');

mongoose.connect(database.URI, {
    useNewUrlParser: true
})
    .then(db => console.log('BD is conected'))
    .catch(err => console.err(err));