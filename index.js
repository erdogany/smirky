var app = require('express')();
var bodyParser = require('body-parser');
var GoogleSearch = require('google-search');
var S = require('string');


var googleSearch = new GoogleSearch({
  key: 'AIzaSyAGGGZi0KlrmiBRKryMICgrz16hcsxyLEI',
  cx: '016010965254068421165:dvys1o6nylk'
});

app.set('port', (process.env.PORT || 5000));

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 


var request = function(req, res) {	
	console.log("Full text:" + req.body.text);	
	console.log("Trigger word:" + req.body.trigger_word);	
	var searchText = 'meme cat';
	if (req.body.trigger_word == null) {
		searchText = S(req.body.text).replaceAll('@Smirky', '').replaceAll('@smirky', '').trim().s;
	} else {
		searchText = req.body.trigger_word;
	}
	searchText = 'meme ' + searchText;
	console.log(searchText);	
	googleSearch.build({
	  q: searchText,
	  start: 1,
	  fileType: "jpg",
	  searchType: "image",
	  num: 10
	}, function(error, response) {
		try {
		  if(error) {
		  	console.error(error);
		  	res.send('{ "text": "http://rs2img.memecdn.com/Fail-Cat_o_111100.gif" }');
		  } else {
		  	console.log("success");
		  	if (response.items != null && response.items.length > 0) {
		  	  var random = Math.floor((Math.random() * response.items.length));	  		
		  		res.send('{ "text": "'+ response.items[random].link +'" }');
		  	} else {
		  		console.log(response);
		  		res.send('{ "text": "http://rs2img.memecdn.com/Fail-Cat_o_111100.gif" }');
		  	}
		  }	  
		} catch(err) {
			console.error(err);
			res.send('{ "text": "http://rs2img.memecdn.com/Fail-Cat_o_111100.gif" }');
		}
	});
  
};






app.get('/', request);
app.post('/', request);

app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'))
});
