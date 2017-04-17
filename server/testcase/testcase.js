var StatUpRedis=require('./StatUpRedis');
module.exports.clear = (event, context, callback) => {
  StatUpRedis.ClearAllKey(function(msg){
   var response = {
     statusCode: 200,
       body: JSON.stringify({
         message: msg
       })
    };
    callback(null,response);
  })
};


