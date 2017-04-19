var jwt= require('jsonwebtoken'); 
var ModelMessage=require('./model/Message');

exports.ValidUser=function(token,callback){
  jwt.verify(token,'statup-secret-key', function(err, decoded) {      
    if (err) {
      console.log(err);
      callback(false);
    }else {
      callback(true);
    }
  });
};
// NEED TO KNOW HOW IT'S WORKS. 
var Policy = function(principalId, effect, resource) {
  var authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    var policyDocument = {};
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

module.exports.auth = (event, context, callback) => {
  var token = event.authorizationToken;
  //extra custom authorization logic here
  jwt.verify(token,'statup-secret-key', function(err, decoded) {      
    if (err) {
    	callback('Unauthorized');
    }else {
    	callback(null, Policy('user', 'Rubel hasan', event.methodArn));
    }
  });

};
