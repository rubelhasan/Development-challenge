var ModelMessage=require('./model/Message');
var PostHelper=require('./PostHelper');
var JsonModel=require('./model/JsonModel');
var AWS = require('aws-sdk');

// deleting all messages without special key
exports.DeleteAllOtherMsg=function(){
	//need to check init(initialize a empty json object)
	JsonModel.Init();
  //Getting all messages for archive 
	ModelMessage.GetMessage(function(message_content){
    var deleted_content=[];
    // using the setTimeout function so that not blowing the event loop
    setTimeout(function(){ 
      message_content.forEach(function (item,index) {
        if(PostHelper.Matchkey(item,PostHelper.MsgKey())){
          ModelMessage.DeletMsg(index,function(){ });
          deleted_content.push(item);
        }
      })
      // archiving all messages without special key
      JsonModel.StoreDataIntoJson(deleted_content);
    },0);
	});
};

exports.Update=function(obj,search_key){
  // deleting all messages without special key
  this.DeleteAllOtherMsg();
  if(!PostHelper.SpecialMatchKey(obj,search_key)){
    // For SNS notification
    this.Notification();
  }
};

exports.Notification=function(){
  //need to add key
  AWS.config.update({
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
    region: 'us-west-1'
  });
  // sns notification object
  var sns = new AWS.SNS();
  var payload = {
    default: 'SNS Notification',
    APNS: {
      aps: {
        alert: 'This is sns Notification from statup',
        sound: 'default',
        badge: 1
      }
    }
  };
  payload.APNS = JSON.stringify(payload.APNS);
  payload = JSON.stringify(payload);
  sns.publish({
    Message: payload,     
    MessageStructure: 'json',
    TargetArn: "arn:aws:sns:us-west-1:1234567890:amazon-message-received"
  },function(err, data) {
      if(err) {
        console.log("Error SNS while sending notification", err.stack);
      return;
    }
    // SNS sent and need to DeleteAllOtherMsg other action
  });
};
