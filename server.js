// import the models
const { Entry } = require('./models');

const express = require('express');
const path = require('path');
var hbs = require( 'express-handlebars');
const session = require('express-session');

app = express();
app.set('port', 3002);

// setup handlebars and the view engine for res.render calls
// (more standard to use an extension like 'hbs' rather than
//  'html', but the Universiry server doesn't like other extensions)
app.set('view engine', 'html');
app.engine( 'html', hbs( {
  extname: 'html',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

// setup body parsing for form data
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up session (in-memory storage by default)
app.use(session({secret: "This is a big long secret lama string."}));

// setup static file service
app.use(express.static(path.join(__dirname, 'static')));

//////////////////////////////////////////////////////////////////
// default route for setup

app.get('/', (req,res) => {
	res.send("<h1>Your server awaits</h1>")
});

//////////////////////////////////////////////////////////////////
// routes for the two pages, mocked up
// modify these to complete questions

app.get('/list', (req,res) => {
	res.render('list');
});

app.get('/end', (req,res) => {
	res.render('end');
});

//////////////////////////////////////////////////////////////////
// add additional routes here as needed





//////////////////////////////////////////////////////////////////

var server = app.listen(app.get('port'), function() {
	console.log("Server started...")
});
