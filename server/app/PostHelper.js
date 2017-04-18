var Model=require('./model/Message');
var Archive=require('./Archive');

exports.MsgKey=function(){
  var msgkey=['amazon','daynamicDb','lambda']
  return msgkey;
};

exports.SpecialMatchKey=function(obj,search_key){
	if(!this.wordInString(obj.text.toLowerCase(),search_key[0].toLowerCase())){
    // archive all data and adding a post
    return true
  }else{
    //need to send notification and archive all data and adding a post
    return false
  }
}
exports.wordInString=function(s,word){
  return new RegExp( '\\b' + word + '\\b', 'i').test(s);
}

exports.Matchkey=function(obj,search_key){
  if(!this.wordInString(obj.text.toLowerCase(),search_key[0].toLowerCase()) && !this.wordInString(obj.text.toLowerCase(),search_key[1].toLowerCase()) && !this.wordInString(obj.text.toLowerCase(),search_key[2].toLowerCase()) ){
    return true;
  }else{
   	return false;
  }	
}

exports.ValidObj=function(msg){
	// need to remove json.parse 
  var obj=JSON.parse(msg);
  if(obj.text==''){
    // if the text is empty need to send message
    return false
  }else{
    return true;
  }
};

exports.MatchkeyWithString=function (msg,postType,action_id,callback){
  //need to remove static if conditioner
  var obj=JSON.parse(msg);
  var search_key=this.MsgKey();
  if(this.Matchkey(obj,search_key)){
    // add normal post
    Model.GetSpecialKey(function(value){
      if(value!=='ok'){
        if(postType=='add'){
          Model.AddMsg(msg,function(index){
           callback(index);
          });
        }else{
          Model.UpdateMsg(msg,action_id,function(updatemsg){
            callback(updatemsg);
          });
        }
      }else{
        //Need to add into json error message
        callback('not save');
      }
    })
  }else{
    //add normal post and other action
    Archive.Update(obj,search_key);
    if(postType=='add'){
      Model.AddMsg(msg,function(index){
        callback(index);
        Model.AddSpecialKey();
      });
    }else{
      Model.UpdateMsg(msg,action_id,function(updatemsg){
        callback(updatemsg);
      });
   }
  }  
}