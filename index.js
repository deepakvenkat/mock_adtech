var express = require("express");
var http = require("http");
var _ = require("underscore");
var url = require("url");
var fs = require("fs");

var app = express();
var port = 3000;

app.use(express.static(__dirname + '/result'));

var httpServer = http.createServer(app).listen(port, function () {
  console.log("Listening on port " + port);
});

app.get("/", function (req, res) {
  res.send("hello world");
});


app.get("/ads:id", function (req, res) {
  // var url_parts = url.parse(req.url, true);
  // var query = url_parts.query;
  // console.log(query);
  var query = req.params.id;
  var params = query.split(';');
  var rand = Math.random();
  if(rand % 7 === 0){
    console.log("random failure");
    res.send("var a = 'blah'");
    return;
  }
  if (params.indexOf("KVcurrent_ad=1") > -1/*query.current_ad === "1"*/) {
    fs.readFile('double_slate_1.js', function (error, file) {
      if(error)
        console.log(error);
      else {
        res.writeHead(200, {'Content-Type': "text/javascript"});
        res.end(file);
      }
    });
  } else if (params.indexOf("KVcurrent_ad=2") > -1 /*query.current_ad === "2"*/) {
    if(rand % 11 === 0) {
      res.send("var a = 'blah'");
      return;
    }
    fs.readFile('double_slate_with_vasts_2.js', function (error, file) {
      if(error)
        console.log(error);
      else {
        res.writeHead(200, {'Content-Type': "text/javascript"});
        res.end(file);
      }
    });
  }

});

app.get("/vast", function (req, res) {
  fs.readFile("vast.xml", function (error, file) {
    if(error)
      console.log(error);
    else {
      res.writeHead(200, {'Content-Type': 'application/xml'});
      res.end(file);
    }
  });
});

app.get("/legacy_vast:id", function (req, res) {
  fs.readFile("legacy_template.js", function (error, file) {
    if(error)
      console.log(error);
    else {
      res.writeHead(200, {'Content-Type': 'application/xml'});
      res.end(file);
    }
  });
});

app.get("legacy_vast_dual:id", function (req, res) {
  fs.readFile("legacy_template_dual.js", function (error, file) {
    if(error)
      console.log(error);
    else {
      res.writeHead(200, {'Content-Type': 'application/xml'});
      res.end(file);
    }
  });
});