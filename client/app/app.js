var app = angular.module('postMessages', []);

app.constant('config', {
  apiUrl: 'http://'+location.hostname+':3000/'
});

app.service('AnonymousUser',function(config,$http){
  // need to create AnonymousUser from server
  this.getFullname=function(callback){
      $http({
        method: 'GET',
        url: config.apiUrl+'get-anonymous-user'
      }).then(function successCallback(response) {
        callback(response.data.message)
      },function errorCallback(response) {
        alert('error')
      });
  }
});

app.service('Msg',function(config,$http){
  this.getMsglist=function(callback){
    $http({
      method: 'GET',
      url: config.apiUrl+'get-message'
    }).then(function successCallback(response) {
        callback(response.data.message)
    },function errorCallback(response) {
        
    });
  }
  this.postMessages=function(Post,callback){
    var msgObject={'user_name':Post.user.name,'text':Post.msg,'token':Post.user.token}
    $http.post(config.apiUrl+'add-message?token='+Post.user.token, msgObject).then(function(response){
      if(Number.isInteger(response.data.message)){
        Post.listConent.push({text:Post.msg, user_name:Post.user.name,list_index:response.data.message});
        Post.msg=''
      }else{
        Post.listConent.push({text:Post.msg, user_name:Post.user.name,list_index:0,status:true});
        Post.msg=''
      }
    },function(){
          alert('error')
    });
  }
    
  this.DeleteMsg=function(ob,callback){
    $http({
      method: 'GET',
      url: config.apiUrl+'delete-message/'+ob.list_index+'?token='+ob.token
    }).then(function successCallback(response) {
        //callback(id);
    },function errorCallback(response) {
       alert('error')
    });
    callback(ob.list_index);
  }

  this.archived=function(){
    return [{text:'List', done:true},{text:'datalist', done:true}];
  }

});



app.service('CheckMsgstring',function(){
  // need to remove this class
  this.msgKey=function(){
    var msgkey=['amazon','daynamicDb','sagar','faysal']
    return msgkey;
  };

  this.checkStringwithKey=function(msg,callback){
    var search_key=this.msgKey();
    // need to remove static if conditioner
    if(msg.toLowerCase().indexOf(search_key[0].toLowerCase())==-1 && msg.toLowerCase().indexOf(search_key[1].toLowerCase())==-1 && msg.toLowerCase().indexOf(search_key[2].toLowerCase())==-1){
      callback()
    }else{
      if(msg.toLowerCase().indexOf(search_key[0])==-1){
        // 'archive all data'
      }else{
        // 'need to send notification'
      }
    }
  };

  this.addMsg=function(Post){
    Post.listConent.push({text:Post.msg, user_name:Post.user.user_name});
  }
});

app.controller('PostController', function(AnonymousUser,Msg,CheckMsgstring) {

  var Post = this;
  AnonymousUser.getFullname(function(user){
    Post.user=user;
  });
  Msg.getMsglist(function(data){
    Post.listConent=data;
  }); 
    
  Post.activeUser=function(list){
    if(list.user_name==Post.user.name){
      return true;
    }
  };

  Post.AddPost = function() {
    Msg.postMessages(Post)
  };

  Post.DeletePost=function(obj){
    var DeleteObj={
      'list_index':obj.list_index,
      'token':Post.user.token,
    }
    Msg.DeleteMsg(DeleteObj,function(index){
      Post.listConent.splice(index,1);
    })
  }
  Post.archive = function() {
      
  };
 
})
  