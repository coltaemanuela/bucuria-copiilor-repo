var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('./config/config.json');
var firebaseConfig = require('./config/firebaseConfig.json');
var firebase = require('firebase');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.sendgrid.key);
// firebase.analytics();

var app = express();
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
// firebase.initializeApp(firebaseCredentials);

firebase.initializeApp(firebaseConfig.firebaseCredentials);

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
    html: '<strong>' + req.body.message + '</strong>',
  };
  sgMail.send(msg);

});


app.post('/subscribe', urlencodedParser, function (req, res) {
  console.log("got into subscribe endpoint");
  var subscriptionsRef = firebase.database().ref("subscriptions");
  console.log(subscriptionsRef);
  var email = req.body.email;
  subscriptionsRef.push({
    email: req.body.email,
  });
  res.send("ok");
});

app.listen(3000, function () {
  console.log('Example app listening on port: 3000');
});