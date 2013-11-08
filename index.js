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
  var rand = 7//Math.random();
  if(rand % 7 === 0){
    console.log("random failure");
    res.send("var a = 'blah'");
    return;
  }
  if (params.indexOf("KVcurrent_ad=1") > -1/*query.current_ad === "1"*/) {
    fs.readFile('double_slate_1_2.js', function (error, file) {
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

app.get("/alternative_ad:id", function (req, res) {
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
  console.log("alternative_ad");
  if (params.indexOf("KVcurrent_ad=1") > -1/*query.current_ad === "1"*/) {
    fs.readFile('double_slate_with_vasts_2.js', function (error, file) {
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

app.get("/vast_error", function (req, res) {
  res.writeHead(200, {'Content-Type': "text/javascript"});
  res.end();
});

app.get("/survey_standalone:id", function (req, res) {
  res.writeHead(200, {'Content-Type': "text/javascript"});
  res.end('initContentUnlockWithStandaloneSurvey("1", "12345");');
});


app.get("/survey/v1/surveys/survey.js", function (req, res) {
  fs.readFile("survey_1.js", function (error, file) {
    if(error)
      console.log(error);
    else {
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.end(file);
    }
  });
});

app.get("/cu.js/:id", function (req, res) {
  fs.readFile("cu.js", function (error, file) {
    if(error)
      console.log(error);
    else {
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.end(file);
    }
  });
});

app.get("/vpaid_single:id", function (req, res) {
  fs.readFile("vpaid_single_slate.js", function (error, file) {
    if(error)
      console.log(error);
    else {
      res.writeHead(200, {'Content-Type': 'application/xml'});
      res.end(file);
    }
  });
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

app.get("/vast_vpaid", function (req, res) {
  fs.readFile("vast_vpaid.xml", function (error, file) {
    if(error)
      console.log(error);
    else {
      res.writeHead(200, {'Content-Type': 'application/xml'});
      res.end(file);
    }
  });
});

app.get("/vast_with_wrapper", function (req, res) {
  fs.readFile("vast_with_wrapper.xml", function (error, file) {
    if(error)
      console.log(error);
    else {
      res.writeHead(200, {'Content-Type': 'application/xml'});
      res.end(file);
    }
  });
});

app.get("/vast_media.xml", function (req, res) {
  fs.readFile("vast_media_file.xml", function (error, file) {
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


app.get("/vast_wrapper:id", function (req, res) {
  fs.readFile("vast_wrapper.js", function (error, file) {
    if(error)
      console.log(error);
    else {
      res.writeHead(200, {'Content-Type': 'application/xml'});
      res.end(file);
    }
  });
});

app.get("/vpaid_companion", function (req, res) {
  fs.readFile("vpaid_With_companion.xml", function (error, file) {
    if(error)
      console.log(error);
    else {
      res.writeHead(200, {'Content-Type': 'application/xml'});
      res.end(file);
    }
  });
});

app.get("/crossdomain.xml", function (req, res) {
  fs.readFile("crossdomain.xml", function (error, file) {
    if(error)
      console.log(error);
    else {
      res.writeHead(200, {'Content-Type': 'application/xml'});
      res.end(file);
    }
  });
});

app.get("/vast/crossdomain.xml", function (req, res) {
  fs.readFile("crossdomain.xml", function (error, file) {
    if(error)
      console.log(error);
    else {
      res.writeHead(200, {'Content-Type': 'application/xml'});
      res.end(file);
    }
  });
});

app.get("/leave_behind:id", function (req, res) {
  fs.readFile("leave_behind.js", function (error, file) {
    if(error)
      console.log(error);
    else {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.end(file);
    }
  });
});
app.get("/skipAd", function (req, res) {
  console.log("in here");
  res.writeHead(200, {'Content-Type' : 'image/png'});
  res.end("");
});

// db.messages.aggregate([
//   {$match: {"headers.From": "andrew.fastow@enron.com", "headers.To":"jeff.skilling@enron.com"}}
// ])
// db.messages.aggregate([
//   {$project: {from: "$headers.From", to: "$headers.To"}},
//   {$unwind: "$to"},
//   {$group: {_id: "$from", toEmails: {$addToSet: "$to"}}},
//   {$unwind: "$toEmails"},

// ])

// db.messages.update({"headers.Message-ID": "<8147308.1075851042335.JavaMail.evans@thyme>"}, {$push: {"headers.To": "mrpotatohead@mongodb.com"}})
// db.messages.find({"headers.Message-ID": "<8147308.1075851042335.JavaMail.evans@thyme>"}).findOne()

// db.fubar.ensureIndex({"a": 1, "b":1}, {name: "a_1_b_1"})
// db.fubar.ensureIndex({"a": 1, "c":1}, {name: "a_1_c_1"})
// db.fubar.ensureIndex({"c": 1}, {name: "c_1"})
// db.fubar.ensureIndex({"a": 1, "b":1, "c": -1}, {name: "a_1_b_1_c_-1"})

// db.images.aggregate([
//  {$match: {"tags" : "kittens"}},
//  {$group: {_id: null, kittenCount: {$sum: 1} }}
// ])

// db.messages.aggregate([
//   {$project: {"from": "$headers.From", "to": "$headers.To"}},
//   {$unwind: "$to"},
//   {$group: {_id: {"_id": "$_id", "from": "$from"}, toEmails: {$addToSet: "$to"}}},
//   {$unwind: "$toEmails"},
//   {$group: {_id: {"from": "$_id.from", "to": "$toEmails"}, emailCount: {$sum: 1}}},
//   {$sort: {'emailCount': 1}}
// ])




