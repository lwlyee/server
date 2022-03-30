const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true, useUnifiedTopology: true
};

mongoose.connect('mongodb://127.0.0.1:27017/wishList', options);
// mongoose.connect('mongodb+srv://lwlyee:lll614656965@cluster0.1iudn.mongodb.net/wishList', options);

const db = mongoose.connection;

db.on('open', console.error.bind(console, 'connection success:'));
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose