var redis = require('redis');
var DB = require('./DataBase').DbObj();
var client=DB;

exports.AddMsg=function(msg,callback){
  client.rpush('message',msg,function(error, index){
    if(error) throw error
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
  client.lrange('message', 0, -1, function (error, items) {
    if(error) throw error
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
	  console.error('error', err);
	}else{
	  console.log('add');
	}
	callback('update')
  })
}

exports.DeletMsg=function(id,callback){
   console.log('DeletMsg');
  // Need to remove lset;
  client.lset('message',id,'DELETED', function (err) {
    client.lrem('message',id,'DELETED', function (err) {
	  if (err) {
	    console.error('removeListRow', err);
	  }else{
	    console.log('delete');
	  }
	  callback('delete');
	})
  });
}

exports.DeletMsgWithtoken=function(id,token,callback){
  client.lrange('message', id, id, function (error, items) {
 	var item=JSON.parse(items)
 	if(item.token==token){
	  client.lrem('message',id,items.toString(), function (err) {
	    if(err){
		  console.error('removeListRow', err);
	    }else{
	      console.log('delete');
	    }
		callback('delete');
	  })
 	}else{
	  callback('token not metch');
 	}
  })
}


