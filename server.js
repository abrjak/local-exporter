var express = require('express'),
app = express(),
bodyParser = require('body-parser'), 
port = process.env.PORT || 9091;

app.listen(port);

console.log('orc-exporter server started on port: ' + port);

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.raw());

var routes = require('./routes/appRoutes.js');
routes(app);

