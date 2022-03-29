const express = require('express');
const router = express.Router();
const {Wish} = require('../model/schema');

router.use(express.static('../public'))

/* GET home page. */
router.get('/index/624349186d3327b73a4f5278', function(req, res, next) {
  res.sendFile(path.resolve('../public/index.html'))
});

router.post('/setUserFirst', function(req, res){
  Wish.findOneAndUpdate(
    {"_id": req.body.userId},
    {$set: {'isFirst': false}},
    {new: true},
    function(err, doc){
      if(err) res.json({statu: 1, err: err})
      res.json({statu: 0, doc: doc})
    }
  )
})

router.post('/resetUser', function(req, res){
  Wish.findOneAndUpdate(
    {"_id": req.body.userId},
    {$set: {'wishList': [], 'isFirst': true}},
    {new: true},
    function(err, doc){
      if(err) res.json({statu: 1, err: err})
      res.json({statu: 0, doc: doc})
    }
  )
})

router.get('/getUser', function(req, res){
  Wish.find({
    "_id": req.query.userId
  }, function(err, doc){
    if(err) res.json({statu:1, err: err})
    res.json({statu:0, doc:doc})
  })
})

router.get('/getAllUser', function(req, res){
  Wish.find({}, function(err, doc){
    if(err) res.json({statu:1, err: err})
    res.json({statu:0, doc:doc})
  })
})

router.post('/addUser', function(req, res){  //添加用户
  let user = new Wish({
      userName: req.body.userName,
      wishList: [],
      isFirst: true,
  })
  user.save((err, doc)=>{
      if(err) res.json({statu: 1, err: err})
      res.json({statu: 0, doc: doc})
  })
});

module.exports = router;


/*
该页面没有api
*/