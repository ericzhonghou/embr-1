var express = require('express');
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');
var NaturalLanguageClassifierV1 = require('watson-developer-cloud/natural-language-classifier/v1');
var app = express();


var obj = {
	"name" : "stuff",
	"children" : [
		{
			"name" : "Technology", 
			"size" : 1, 
			"children" : [
				{
					"name" : "Technology",
					"size" : 1,
					"children": [
						{
							"name" : "Technology",
							"size" : 1,
							"sms" : [

							]
						}
					]
				}
			]
		},
		{
			"name" : "Society" , 
			"size" : 1, 
			"children" : [
				{
					"name" : "Society" , 
					"size" : 1, 
					"children" : [
						{
							"name" : "Society" ,
							"size" : 1,
							"sms" : [
								
							]
						}
					]
				}
			]
		},
		{
			"name" : "Development" , 
			"size" : 1, 
			"children" : [
				{
					"name" : "Development" , 
					"size" : 1, 
					"children" : [
						{
							"name" : "Development" ,
							"size" : 1,
							"sms" : [
								
							]
						}
					]
				}	
			]
		},
		{
			"name" : "Disasters", 
			"size" : 1,
			"children" : [
				{
					"name" : "Disasters", 
					"size" : 1,
					"children" : [
						{
							"name" : "Disasters", 
							"size" : 1,
							"sms" : [
								
							] 
						}
					]
				}
			]
		},
		{
			"name" : "Environment", 
			"size" : 1,
			"children" : [
				{
					"name" : "Environment", 
					"size" : 1,
					"children" : [
						{
							"name" : "Environment", 
							"size" : 1,
							"sms" : [
								
							] 
						}
					]
				}
			]
		},
		{
			"name" : "Education", 
			"size": 1,
			"children" : [
				{
					"name" : "Education", 
					"size": 1,
					"children" : [
						{
							"name" : "Education",
							"size" : 1,
							"sms" : [
								
							]
						}
					]
				}
			]
		},
		{
			"name" : "Health", 
			"size": 1,
			"children" : [
				{
					"name" : "Health", 
					"size": 1,
					"children" : [
						{
							"name" : "Health", 
							"size" : 1,
							"sms" : [
								
							]
						}
					]
				}
			]
		},
		{
			"name" : "Food", 
			"size": 1,
			"children" : [
				{
					"name" : "Food", 
					"size": 1,
					"children" : [
						{
							"name" : "Food",
							"size" : 1,
							"sms" : [
								
							]
						}
					]
				}
			]
		},
		{
			"name" : "Economy", 
			"size": 1,
			"children" : [
				{
					"name" : "Economy", 
					"size": 1,
					"children" : [
						{
							"name" : "Economy",
							"size" : 1,
							"sms" : [
								
							]
						}
					]
				}
			]
		}
	]
}


app.use(bodyParser.urlencoded({extended: false}));
 
app.post("/message", function (request, response) {
  console.log(request.body.Body);
  console.log(request.body.From);
  var clusterJSON = getClassification(request.body.Body);
  console.log(clusterJSON);
  //var obj = JSON.parse(jsonStr);

  for(i = 0; i < obj['children'].length; i++) {
  	if(obj['children'][i]['name'] == clusterJSON) {
  		obj['children'][i]['children'][0]['children'][0]['sms'].push({"textmess": request.body.Body});
  		obj['children'][i]['children'][0]['children'][0]['size'] += 1;
  		//jsonStr = JSON.stringify(obj);
  		console.log(JSON.stringify(obj));
  		jsonfile.writeFileSync(__dirname + '/test.json', obj);
  	} 
  }

});

 
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get("/stylesheets/style.css", function (request, response) {
  response.sendFile(__dirname + '/stylesheets/style.css');
});

app.get("/stylesheets/demo.css", function (request, response) {
  response.sendFile(__dirname + '/stylesheets/demo.css');
});

app.get("/stylesheets/normalize.css", function (request, response) {
  response.sendFile(__dirname + '/stylesheets/normalize.css');
});

app.get("/scripts/graph.js", function (request, response) {
  response.sendFile(__dirname + '/scripts/graph.js');
});

app.get("/graph.js", function (request, response) {
  response.sendFile(__dirname + '/graph.js');
});

app.get("/scripts/d3js.js", function (request, response) {
  response.sendFile(__dirname + '/scripts/d3js.js');
});

app.get("/test.json", function (request, response) {
  response.sendFile(__dirname + '/test.json');
});

app.get("/data/new.json", function (request, response) {
  response.sendFile(__dirname + '/data/new.json');
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
	  classifier_id: '004a12x110-nlc-3373' },
	  function(err, response) {
	    if (err) {
	      console.log('error:', err);
	 	}
	    else {
	      console.log(JSON.stringify(response, null, 2));
	  	  return response.top_class;
	  	}
	});


}
