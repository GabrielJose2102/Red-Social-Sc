const express = require('express');
const config = require('./src/server/config');

//database
require('./src/database');
const app = config(express());

//starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

