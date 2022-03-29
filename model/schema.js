const mongoose = require('./connect.js');
// const Schema = db.Schema

const WishSchema = new mongoose.Schema({
  userName: String,
  isFirst: Boolean,
  wishList:[{
        content: String,
        date: {type: Date, default: Date.now},
        isFinished: {type: Boolean, default: false}, //-1代表未完成，1代表完成
        isHidden: {type: Boolean, default: false} //-1代表未完成，1代表完成
    }],
}, {versionKey:false});

const WishModel = mongoose.model('Wish', WishSchema);

module.exports = {
    Wish: WishModel
}