var redis = require('redis');
var DB = require('./DataBase').DbObj();
var client=DB;

exports.AddMsg=function(msg,callback){
  client.rpush('message',msg,function(err, index){
    if(err) throw err
  	  callback(index-1);
  });
};
exports.GetSpecialKey=function(callback){
  client.get('specialmatchkey', function(err, reply) {
 	callback(reply)
  });
}
exports.AddSpecialKey=function(){
  client.set('specialmatchkey', 'ok');
}
exports.RemoveAddSpecialKey=function(){
  client.set('specialmatchkey', 'ok');
}

exports.GetMessage=function(callback){
  client.lrange('message', 0, -1, function (err, items) {
    if(err) throw err
	// need to remove the loop  after complate the damo1
	var content=[];
	setTimeout(function(){ 
	  items.forEach(function (item,index) {
	  	//remove token from message
		var obj={};
		var item=JSON.parse(item)
		obj.user_name=item.user_name
		obj.text=item.text
		obj.list_index=index;
		content.push(obj);
	  })
	  callback(content)
	},0);
  })
};

exports.UpdateMsg=function(msg,action_id,callback){
  client.lset('message',action_id,msg, function (err) {
    if(err) {
   	  throw err
	}else{
	  callback('update')
	}
  })
}
// deleting message without token for test case
exports.DeletMsg=function(id,callback){
  // Need to remove lset;
  client.lset('message',id,'DELETED', function (err) {
    client.lrem('message',id,'DELETED', function (err) {
	  if (err) {
	   throw err
	  }else{
	   callback('delete');
	  }
	})
  });
}
//deleting message with token
exports.DeletMsgWithtoken=function(id,token,callback){
  client.lrange('message', id, id, function (error, items) {
 	var item=JSON.parse(items)
 	if(item.token==token){
	  client.lrem('message',id,items.toString(), function (err) {
	    if(err){
		  throw err
	    }else{
	      callback('delete');
	    }
	  })
 	}else{
	  callback('token not metch');
 	}
  })
}


