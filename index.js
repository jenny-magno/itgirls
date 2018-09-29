var express = require('express');
var app = express();
var router = express.Router();
  
var path = __dirname + '/views/';
  
app.use('/',router);
app.use(express.static(__dirname + '/public'));

router.get('/',function(req, res){
  res.sendFile(path + 'index.html');
});

router.get('/learn',function(req, res){
  res.sendFile(path + 'learn.html');
});
  
router.get('/discover',function(req, res){
  res.sendFile(path + 'discover.html');
});
  
router.get('/have-fun',function(req, res){
  res.sendFile(path + 'have-fun.html');
});

router.get('/quiz1',function(req, res){
  res.sendFile(path + 'quiz.html');
});
  
router.get('/prizes',function(req, res){
  res.sendFile(path + 'prizes.html');
});
  
app.listen(3000,function(){
  console.log('Server running at Port 3000');
});