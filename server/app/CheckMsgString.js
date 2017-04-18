var async = require("async");
var PostHelper=require('./PostHelper');
var Response=require('./Response');

//checking message post condition and other step
exports.MessagePostCondition=function(msg,ParentCallback){
  async.series([
    function(callback) {
      //checking valid msg
      if(PostHelper.ValidObj(msg)){
         callback();
      }else{
         // validation issue 
         ParentCallback('validation issue')
      };
    },function(callback) {
        ParentCallback()
    }
  ]);
};