const express = require('express');
const router = express.Router();
const {Wish} = require('../model/schema');

// const callBack = function(err){}

// router.get('/test', function(req, res, next){
//   console.log('0')
//   next()
// });

router.get('/getWish', function(req, res) {
    Wish.find({
      "_id": req.query.visitUserId
    }, function(err, doc){
      if(err) res.json({statu:1, err: err})
      if(!doc[0].wishList) res.json({statu:1, err: '信息有误'})
      if(req.query.visitUserId !== req.query.userId){
        doc[0].wishList = doc[0].wishList.filter((item) => {
          return item.isHidden === false
        })
      }
      res.json({statu: 0, doc:doc[0].wishList, isFirst: doc[0].isFirst})
    })
});

router.post('/publishWish', function(req, res) {
  Wish.findOneAndUpdate(
    {"_id": req.body.userId},
    {$push: {'wishList': {content: req.body.content}}},
    {safe: true, upsert: true, new: true},
    function(err, doc){
      if(err) res.json({statu: 1, err: err})
      res.json({statu: 0, doc: doc})
    }
  )
});

router.post('/deleteWish', function(req, res) {
  Wish.findOneAndUpdate(
    {"_id": req.body.userId},
    {$pull: {'wishList': {_id: req.body.wishId}}},
    {new: true},
    function(err, doc){
      if(err) res.json({statu: 1, err: err})
      res.json({statu: 0, doc: doc})
    }
  )
});

router.post('/finishWish', function(req, res) {
  Wish.findOneAndUpdate(
    {'_id': req.body.userId, 'wishList._id': req.body.wishId},
    {$set: {'wishList.$.isFinished': req.body.isFinished}},
    {new: true},
    function(err, doc){
      if(err) res.json({statu: 1, err: err})
      res.json({statu: 0, doc: doc})
    }
  )
});

router.post('/hidehWish', function(req, res) {
  Wish.findOneAndUpdate(
    {'_id': req.body.userId, 'wishList._id': req.body.wishId},
    {$set: {'wishList.$.isHidden': req.body.isHidden}},
    {new: true},
    function(err, doc){
      if(err) res.json({statu: 1, err: err})
      res.json({statu: 0, doc: doc})
    }
  )
});

// router.get('/searchWish', function(req, res, next) {
//   res.send('rond with a resource');
// });

// router.post('/labelWish', function(req, res, next) {
//   res.send('rond with a resource');
// });

module.exports = router;



/* 关于wish的后端api
getOwnWish: 获取自己的心愿清单/获取别人的心愿清单
publishWish：发表心愿清单
deleteWish: 删除心愿清单
finishWish: 完成心愿/取消完成心愿
searchWish：搜索心愿 //子功能： 按group，按重要性搜索
labelWish：为心愿标记重要性
*/