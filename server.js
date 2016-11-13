var express = require('express');
var jsonstr = require('/data/test.json');
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');
var NaturalLanguageClassifierV1 = require('watson-developer-cloud/natural-language-classifier/v1');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
 
app.post("/message", function (request, response) {
  console.log(request.body.Body);
  console.log(request.body.From);
  var clusterJSON = getClassification(request.body.Body);
  console.log(clusterJSON.top_class);
  var obj = JSON.parse(jsonStr);

  for(i = 0; i < obj['children'].length; i++) {
  	if(obj['children'][i]['name'] == clusterJSON) {
  		obj['children'][i]['children'][0]['children'][0]['sms'].push({"textmess": request.body.Body});
  		obj['children'][i]['children'][0]['children'][0]['size'] += 1;
  		//jsonStr = JSON.stringify(obj);
  		jsonfile.writeFileSync('/data/new.json', obj);
  	} 
  }

});

 
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



function getClassification(query){

	var natural_language_classifier = new NaturalLanguageClassifierV1({
	  username: 'd70889aa-7fc1-423b-a364-368cfbe96fa0',
	  password: 'nTrwUp2md43K'
	});

	natural_language_classifier.classify({
	  text: query,
	  classifier_id: '<classifier-id>' },
	  function(err, response) {
	    if (err)
	      console.log('error:', err);
	    else
	      console.log(JSON.stringify(response, null, 2));
	});
}
