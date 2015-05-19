var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));


var request = function(request, response) {
	console.log(request.headers);
  response.send('{ "text": "heyo" }');
};


app.get('/', request);
app.post('/', request);

app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'))
});
