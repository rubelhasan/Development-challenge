
exports.ShowJson=function(message,callback){
  var response = {
    statusCode: 200,
      body:JSON.stringify({
        message: message
   	  }),
  	};
  callback(response)
};
