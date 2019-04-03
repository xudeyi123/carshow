var express = require("express")
var fs = require("fs")

var app = express()

app.use(express.static("www"))

app.get('/api',function(req,res){
    var dajson = {}
    fs.readdir('./www/images/Corolla/',function(err,data){
       data.forEach((color)=>{
           dajson[color]={};
           var data2 = fs.readdirSync('./www/images/Corolla/'+ color);
           data2.forEach((album)=>{
            var data3 = fs.readdirSync('./www/images/Corolla/'+ color + '/' + album);
              dajson[color][album]= data3
           })
       })
       res.json({"results":dajson})
    })
})

app.listen(3000)