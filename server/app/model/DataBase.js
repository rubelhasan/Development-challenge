var redis = require('redis');

var client = redis.createClient({
  host: 'localhost',
  port: 9000
});

client.on("error", function (err) {
  if(err) throw err;
});
exports.DbObj=function(){
  return client;
};