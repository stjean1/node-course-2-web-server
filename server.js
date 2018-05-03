const express = require('express');
const hbs =  require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

// set Partials for hbs 
hbs.registerPartials(__dirname + '/views/partials');

// Engine View handlebars
app.set('view engine','hbs');

// maintenance 
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//    pageTitle: 'maintenance Page',
//    welcomeMsg: "Welcome to We are under maintenance"
//   });
// });

// middleware to show static content
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
 var log = `${now}: ${req.method} ${req.path} `;

 console.log(log);
 fs.appendFileSync('server.log', log + '\n');
  next();
});




// Handlesbars Helper to get current Year
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
// Handlesbars Helper toUpperCase
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


// root route 
app.get('/', (req, res) => {
   res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMsg: "Welcome to Express App."
   });
});

// bad route json output
app.get('/about', (req, res) => {
  res.render('about.hbs', {
      pageTitle: 'About Page',
 });
});


// Starting server 
app.listen(port, () => {
  console.log(`Server running on port ${port} ...`);
});