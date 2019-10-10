//----------------------------------Modules / Files ----------------------------------------------------------------------

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('./config/config.json');
// var sg = require('sendgrid')(config.sendgrid.key);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgrid.key);

var app = express();

//-------------------------------- View engine setup---------------------------------------------------------------------

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});
//------------------------------------- Routing ---------------------------------------------------------------------------
app.get('/', function (req, res) {
  res.render('home');
});
app.get('/about', function (req, res) {
  res.render('about');
});
app.get('/support', function (req, res) {
  res.render('support');
});
app.get('/contact', function (req, res) {
  res.render('contact');
});
app.post('/contact', urlencodedParser, function (req, res) {
  console.log(req.body)
  const msg = {
    to: 'coltaemanuela@gmail.com',
    from: req.body.email,
    subject: 'Sending with SendGrid is Fun',
    text: req.body.message,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg);
  // res.send("ok");

});

//------------------------------------- Server ----------------------------------------------------------------------------

app.listen(3000, function () {
  console.log('Example app listening on port: 3000');
});