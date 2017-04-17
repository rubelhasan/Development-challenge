'use strict';
var CheckMsgString=require('./CheckMsgString');
var Validation=require('./Validation');
var ModelMessage=require('./model/Message');
var ModelUser=require('./model/User');
var PostHelper=require('./PostHelper');
var Response=require('./Response');

// inserting message into message list
module.exports.AddMessage = (event, context, callback) => {
  Validation.ValidUser(event.queryStringParameters.token,function(auth){
    if(auth==false){
      Response.ShowJson('not valid user',function(response){
        callback(null, response);
      });
    }else{
      var post_json_object=event.body;
      CheckMsgString.MessagePostCondition(post_json_object,function(index){
        PostHelper.MatchkeyWithString(post_json_object,'add','',function(index){
          Response.ShowJson(index,function(response){
           callback(null, response);
          });
        });
      });
    };
  });
};

// getting message into message list
module.exports.getMessage = (event, context, callback) => {
  ModelMessage.GetMessage(function(message_content){
    Response.ShowJson(message_content,function(response){
      callback(null, response);
    });
  });
};

// deleting a message from message list
module.exports.deleteMessage= (event, context, callback) => {
  Validation.ValidUser(event.queryStringParameters.token,function(auth){
    if(auth==false){
      Response.ShowJson('not valid user',function(response){
        callback(null, response);
      });
    }else{
      ModelMessage.DeletMsgWithtoken(event.pathParameters.id,event.queryStringParameters.token,function(deletemsg){
        Response.ShowJson(deletemsg,function(response){
          callback(null, response);
        });
      })
    }
  });
};

// creating  AnonymousUser 
module.exports.GetAnonymousUser = (event, context, callback) => {
  ModelUser.GetUser(function(user){
   Response.ShowJson(user,function(response){
     callback(null, response);
    });
  });
};

//updating the value 
module.exports.UpdateMessage = (event, context, callback) => {
  Validation.ValidUser(event.queryStringParameters.token,function(auth){
    if(auth==false){
      Response.ShowJson('not valid user',function(response){
        callback(null, response);
      });
    }else{
      var post_json_object=event.body;
      CheckMsgString.MessagePostCondition(post_json_object,function(index){
        PostHelper.MatchkeyWithString(post_json_object,'update',event.pathParameters.id,function(index){
          Response.ShowJson(index,function(response){
           callback(null, response);
          });
        });
      });
    };
  });
};  



