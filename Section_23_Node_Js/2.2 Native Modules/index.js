const fs = require('node:fs');

fs.writeFile('message.txt','Hello from node.js',(err)=>{
    if (err){
        throw err;
    }else{
        console.log('the file has been saved');
    }
})

fs.readFile('message.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });