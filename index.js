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
	  start: 1,
	  fileType: "jpg",
	  searchType: "image",
	  num: 10
	}, function(error, response) {
	  if(error) {
	  	console.log("error");
	  	res.send('{ "text": "http://rs2img.memecdn.com/Fail-Cat_o_111100.gif" }');
	  } else {
	  	console.log("success");
	  	if (response.items.length > 9) {
	  	  var random = Math.floor((Math.random() * 10));	  		
	  		res.send('{ "text": "'+ response.items[random].link +'" }');
	  	} else {
	  		res.send('{ "text": "http://rs2img.memecdn.com/Fail-Cat_o_111100.gif" }');
	  	}
	  }	  
	});
  
};






app.get('/', request);
app.post('/', request);

app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'))
});
