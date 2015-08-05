var express = require("express");
var path = require("path");

var app = express();

app.set("port", (process.env.PORT || 5000));

app.get("/data", function(req, res){
   res.json({
       "scott": {
           "name" : "Scott",
           "location" : "Blaine"
       },
       "brandon":{
           "name" : "Brandon",
           "location" : "Minneapolis"
       },
       "skyler":{
           "name" : "Skyler",
           "location" : "Maple Grove"
       },
       "bob": {
           "name" : "Bob",
           "location" : "Maplewood"
       }
   });
});

app.get("/*", function(req, res){
    var file = req.params[0] || "views/index.html";
   res.sendFile(path.join(__dirname, "./public", file));
});

app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});