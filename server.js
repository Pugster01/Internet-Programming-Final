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

app.get('/list', async (req,res) => {
  var list_active = await Entry.findAll({
    where: {active: 1},
    order: [["priority", "ASC"]]
  })

  if(!req.session.toggleInactive) {
    var list_inactive = await Entry.findAll({
      where: {active: 0},
      order: [["priority", "ASC"]]
    })
  }
  else{
    var list_inactive = []
  }

	res.render('list', {lista: list_active, listi:list_inactive, active: !req.session.toggleInactive});
});


app.get('/end/:id', async (req,res) => {
  var e = await Entry.findByPk(req.params.id)
  console.log(e)
	res.render('end', {Entry: e});
});

//////////////////////////////////////////////////////////////////
// add additional routes here as needed

app.get('/toggleInactive', (req, res) => {
  if(req.session.toggleInactive){
    req.session.toggleInactive = !req.session.toggleInactive
  }
  else  {
   req.session.toggleInactive = true
  }

  res.redirect("/list")
})


app.post('/gloat/:id', async (req, res) => {
  await Entry.update({
    active: 0,
    gloats: req.body.gloat
  },
  {
    where: { id: req.params.id }
  });

  res.redirect('/list')
})

app.post("/editReason", async (req, res) => {
  await Entry.update({
    reason: req.body.text
  },
  {
    where: { id: req.body.id }
  });

  res.status(200).send()
})
//////////////////////////////////////////////////////////////////

var server = app.listen(app.get('port'), function() {
	console.log("Server started...")
});
