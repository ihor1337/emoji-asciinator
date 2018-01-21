const express = require('express');
const app = express();
const request = require('request');
const imageToAscii = require("image-to-ascii");
const fs = require('fs');
const data = require('./data.json')

let saveToDisk = (req, res, next) =>{
  let code = ''
  if (req.params.code){
      if (req.params.code.indexOf('U+'.toLowerCase() === -1)){
        code = 'U+'+req.params.code;
      }
      code = code.toUpperCase();
      
      if (data[code]) {
        let b64 = data[code].replace(/^data:image\/png;base64,/, "");
        fs.writeFile("out.png", b64, 'base64', (err)=> {
          if (err) res.status(500).send("could't decode base64 emoji")
          next()
        })
      }else{
        res.status(500).send("Couldn't find an image for a given unicode")
      }
  }else{
    res.status(500).send("Couldn't find a unicode parameter")
  }
}

//app.use(saveToDisk)

app.get('/:code', saveToDisk, (req, res)=>{
  imageToAscii('./out.png', {
    colored: false
  }, (err, converted) => {
    if(err) res.status(500).send("Could't asciify this emoji");
    res.send(`<pre>${converted}</pre>`);
    console.log(err || converted)
  }); 
})

const PORT = process.env.PORT || 3000;
app.listen(3000, ()=> console.log("listening on "+PORT));
