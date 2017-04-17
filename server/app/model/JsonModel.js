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
    	console.log('StoreDataIntoJson');
    })
};
exports.Init=function(){
  db.defaults({ message: [] })
  .write()
  .then(() => {
    console.log('inti')
  })
};
