/*  IT 122 - ADV JS - Week1 Assignment
    Node.js up and running
    --index.js - with code to launch a node.js web server on port 3000
    and respond to requests. Should import your data.js module.
    --Your web server should send different responses for these urls:
        --http://localhost:3000 (Links to an external site.) - shows
        some home-page information and total number of items in your array
        --http://localhost:3000/about (Links to an external site.) - returns
        some information about yourself
        --Any other path returns a 404 status code and error message
    Created By: Mike Gilson
    Date: 07/02/2020
*/

// Creae variables for required modules for http and data.js
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const movies = require("./data");

const app = express();
const exphbs = require('express-handlebars');
// Create variable to reference getter method from data.js
const displayMovies = movies.getAll();

app.engine('handlebars', exphbs({
    //defaultLayout: false
    layoutsDir: `${__dirname}/views/layouts`
    //defaultLayout: 'index'
    //partialsDir: `${__dirname}/views/partials`
}));

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
// Set location for static files
app.use(express.static(__dirname + '/public' ));
// Parse form submissions
app.use(bodyParser.urlencoded({extended: true}));

// Send static files as response
app.get('/', (req, res) => {
    //res.type('text/html');
    //res.sendFile(__dirname + '/public/home.html');
    //res.locals.movies = JSON.stringify(movies);
    res.render('home', {layout: 'index'});
});

app.get('/get', (req, res) => {
    console.log(req.query);
    let result = movie.get(req.query.title);
    res.render('details', {title: req.query.title, movie: result});
});

// Send plain text response
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page\n This is Mike\'s About Page. He is learning node.js this quarter, which is an interesting challenge.\n Expect much stress baking to result!');
});

// Define 404 handler
app.use( (req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found'+ displayMovies[1].title);
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});

// Create web server, with switch for 3 different url cases
// http.createServer(function (req, res) {
//     const path = req.url.toLowerCase();
//     switch(path) {

// // Switch case for home page, displays text and calls on the 
// //  getter method to display the length of the array from
// //  data.js as response
//         case '/':
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.end('Home page\n'+ 'Array length: '+ displayMovies.length);
//             break;

// // Switch case for about page, displays basic text info as
// //  response
//         case '/about':
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.end('About page\n This is Mike\'s About Page. He is learning node.js this quarter, which is an interesting challenge.\n Expect much stress baking to result!');
//             break;

// // Final default switch case for any other pages. Response will
// //  display an error message
//         default:
//             res.writeHead(404, {'Content-Type': 'text/plain'});
//             res.end('Error - Page Not found');
//             break;
//     }

// Listens for requests on whatever por is assigned by the os
//  or defaults to 3000 
// }).listen(process.env.PORT || 3000);