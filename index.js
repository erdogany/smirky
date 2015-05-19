var app = require('express')();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 


var request = function(req, res) {	
	console.log(req.body);
  res.send('{ "text": ' + JSON.stringify(req.body) + ' }');  
};


app.get('/', request);
app.post('/', request);

app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'))
});
