var app = require('express')();
var bodyParser = require('body-parser');
var GoogleSearch = require('google-search');


var googleSearch = new GoogleSearch({
  key: 'AIzaSyAGGGZi0KlrmiBRKryMICgrz16hcsxyLEI',
  cx: '016010965254068421165:dvys1o6nylk'
});

app.set('port', (process.env.PORT || 5000));

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 


var request = function(req, res) {	
	console.log(req.body.text);	
	googleSearch.build({
	  q: req.body.text,
	  start: 5,
	  fileType: "pdf",
	  gl: "uk", //geolocation, 
	  lr: "lang_en",
	  num: 10, // Number of search results to return between 1 and 10, inclusive 
	  siteSearch: "http://kitaplar.ankara.edu.tr/" // Restricts results to URLs from a specified site 
	}, function(error, response) {
	  if(error) {
	  	console.log("error");
	  	res.send('{ "text": "error" }');
	  } else {
	  	console.log("success");
	  	console.log(response);
	  	res.send('{ "text": "success" }');
	  }	  
	});
  
};






app.get('/', request);
app.post('/', request);

app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'))
});
