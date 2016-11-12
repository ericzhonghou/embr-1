var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
 
app.post("/message", function (request, response) {
  console.log(request.body.Body);
  console.log(request.body.From);  
  document.getElementById("line").innerHTML("cat");
  response.send("<Response><Message>" + request.body.Body + "</Message></Response>");
});

 
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
