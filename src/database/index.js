const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/livros');
mongoose.Promise = global.Promise;

module.exports= mongoose;