var redis = require('redis');
var DB = require('./DataBase').DbObj();
var client=DB;
var jwt= require('jsonwebtoken'); 

exports.AddUser=function(){
  client.set('specialmatchkey', 'ok');
}
exports.GetUser=function(callback){
	var name= '@'+Math.random().toString(36).substr(2, 9);
	var uerObj={user_name:name};
	var token = jwt.sign(uerObj, 'statup-secret-key', { expiresIn: '1440m' });
  	client.set(name,token);
  	callback({
  		name:name,
  		token:token
  	})
}
exports.RemoveUser=function(){
  client.set('specialmatchkey', 'ok');
}
exports.RemoveAddSpecialKey=function(){
  client.set('specialmatchkey', 'ok');
}
