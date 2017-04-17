var jwt= require('jsonwebtoken'); 
var ModelMessage=require('./model/Message');

exports.ValidUser=function(token,callback){
  jwt.verify(token,'statup-secret-key', function(err, decoded) {      
    if (err) {
      console.log(err);
      callback(false);
    }else {
      callback(true);
    }
  });
};

