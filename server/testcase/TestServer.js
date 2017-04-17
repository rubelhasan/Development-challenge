var chai = require('chai');  
var request = require('superagent')
var expect = require('chai').expect;
var assert = require('chai').assert;

var app_ip="localhost:3000"

describe('Clearing data', function(){
  it('Clearing all data from redis database',function(done){
    request
      .get(app_ip+'/testcase-clear')
   	  .accept('json')
	  .end(function(err, res){
	  	assert.equal(res.body.message, 'ok', 'return ok if delete the database');
		done()
   	   })
  })
})

describe('Getting anonymous user ', function(){
  it('Checking valid anonymous user',function(done){
	request
	  .get(app_ip+'/get-anonymous-user')
	  .accept('json')
	  .end(function(err, res){
		user=res.body.message
		done()
	  })
  })  
})


describe('Getting message ', function(){
  it('Checking empty message list',function(done){
    request
      .get(app_ip+'/get-message')
   	  .accept('json')
	  .end(function(err, res){
	  	//need to find better solutions
	  	if(res.body.message.length > 0){
	  		assert.isOk(false, 'return an arry of object');
	  	}
		done()
   	   })
  })
})

describe('Posting messages (user 1)', function(){
    var user={};
    before(function (done) {
	  	request
	      .get(app_ip+'/get-anonymous-user')
	   	  .accept('json')
		  .end(function(err, res){
    		if(err) throw error
			user=res.body.message
			done()
	   	   })
  	})  

    it('Testing post message 1st time',function(done){
	   request
		 .post(app_ip+'/add-message?token='+user.token)
		 .send({"user_name": user.name, 'text': 'First Message','token':user.token})
		 .set('Accept', 'application/json')
		 .end(function(err, res){
		   assert.isNumber(res.body.message, 'Not geting message id');
		   done();
		 });  
	})

   it('Checking message post 1',function(done){
    request
      .get(app_ip+'/get-message')
   	  .accept('json')
	  .end(function(err, res){
	  	//need to find better solutions
	  	if(res.body.message.length != 1){
	  		assert.isOk(false, 'Not getting posting message 1');
	  	}
		done()
   	   })
  	})

	it('Testing post message 2nd time.',function(done){
		request
		   .post(app_ip+'/add-message?token='+user.token)
		   .send({"user_name": user.name, 'text': 'Second Message','token':user.token})
		   .set('Accept', 'application/json')
		   .end(function(err, res){
		   	  assert.isNumber(res.body.message, 'Not geting message id');
		   	  done();
		   });  
	})

	it('Checking posting messages 2',function(done){
    request
      .get(app_ip+'/get-message')
   	  .accept('json')
	  .end(function(err, res){
	  	//need to find better solutions
	  	if(res.body.message.length != 2){
	  		assert.isOk(false, 'Not getting posting messages 2');
	  	}
		done()
   	   })
  	})

  	it('Deleting message 1 with token',function(done){
   		request
	      .get(app_ip+'/delete-message/0?token='+user.token)
	   	  .accept('json')
		  .end(function(err, res){
		  	assert.equal(res.body.message, 'delete', 'return delete text if remove the message');
			done()
	   	   })
  	})
 
  	it('Deleting message 2 without invalid token(false)',function(done){
   		request
	      .get(app_ip+'/delete-message/1?token='+08029893284)
	   	  .accept('json')
		  .end(function(err, res){
		  	assert.equal(res.body.message, 'not valid user', 'you are valid user');
			done()
	   	   })
  	})

  	it('Testing post message third time.',function(done){
		request
	   .post(app_ip+'/add-message?token='+user.token)
	   .send({"user_name": user.name, 'text': 'Third Message','token':user.token})
	   .set('Accept', 'application/json')
	   .end(function(err, res){
	   	  assert.isNumber(res.body.message, 'Not geting message id');
	   	  done();
	   });  
 	})
 	it('Checking posting messages 3',function(done){
   	  request
        .get(app_ip+'/get-message')
   	    .accept('json')
	    .end(function(err, res){
	  	  //need to find better solutions
	  	  if(res.body.message.length != 2){
	  		assert.isOk(false, 'Not getting posting messages 3');
	  	 }
		 done()
   	   })
  	})

  	 it('4th Message 1 (Amazon)',function(done){
		request
		  .post(app_ip+'/add-message?token='+user.token)
		  .send({"user_name": user.name, 'text': 'Amazon','token':user.token})
   	      .accept('json')
		  .end(function(err, res){
		   	assert.isNumber(res.body.message, 'Not geting message id');
		   	done();
		  });  
	  })

  	  it('special key Checking (not save this message into db) ',function(done){
		request
	     .post(app_ip+'/add-message?token='+user.token)
	      .send({"user_name": user.name, 'text': 'Third Message','token':user.token})
		  .set('Accept', 'application/json')
		  .end(function(err, res){
		  	assert.equal(res.body.message, 'not save', 'specialmatchkey not not working');
		   	done();
		  });  
	  })

  	  it('Posting daynamicDb message 1',function(done){
		request
	      .post(app_ip+'/add-message?token='+user.token)
		  .send({"user_name": user.name, 'text': 'First daynamicDb 1','token':user.token})
		  .set('Accept', 'application/json')
		  .end(function(err, res){
		   	// need to check some other issue
		   	assert.isNumber(res.body.message, 'Not geting message id');
		   	done();
		  });  
	  })

  	  it('Posting daynamicDb message 2',function(done){
		request
	      .post(app_ip+'/add-message?token='+user.token)
		  .send({"user_name": user.name, 'text': 'Second daynamicDb 2','token':user.token})
		  .set('Accept', 'application/json')
		  .end(function(err, res){
		   	// need to check some other issue
		   	assert.isNumber(res.body.message, 'Not geting message id');
		   	done();
		  });  
	  })

	  it('Update daynamicDb message 2',function(done){
		request
	      .post(app_ip+'/update-message/1?token='+user.token)
		  .send({"user_name": user.name, 'text': 'Second daynamicDb 2 update','token':user.token})
		  .set('Accept', 'application/json')
		  .end(function(err, res){
		   	// need to check some other issue
		   	assert.equal(res.body.message, 'update', 'return delete text if remove the message');
		   	assert.isNumber(res.body.message, 'Not geting message id');
		   	done();
		  });  
	  })

	  


})


