var low = require('lowdb');
var fileAsync = require('lowdb/lib/storages/file-async');
var db = low('./json/db.json', {
  storage: fileAsync
})

exports.StoreDataIntoJson=function(data){
  db.get('message')
    .push(data)
    .last()
    .write()
    .then(()=>{
    	//stored data into json
    })
};
exports.Init=function(){
  db.defaults({ message: [] })
  .write()
  .then(() => {
    // init json object
  })
};
