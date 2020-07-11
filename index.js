/*  IT 122 - ADV JS - Week2 Assignment
    Express Yourself
    --Convert your index.js code to use Express syntax
    --Update your default route to show formatted information for each item in your data array:
        --create home.handlebars template
        --render this template for requests to your default route
        --pass your data array to the handlebars template
        --display the list of items in your data array 
        --each item is linked to your detail page with a query parameter identifying the item

    Created By: Mike Gilson
    Date: 07/11/2020
*/

// Create variables for required modules for http and data.js
// Define app as Express instance with configuration
const express = require("express");
const bodyParser = require("body-parser");
const movies = require("./data");

const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    defaultLayout: false
}));

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// Set location for static files
app.use(express.static(__dirname + '/public' ));

// Parse form submissions
app.use(bodyParser.urlencoded({extended: true}));

// Create variable to reference getter method from data.js
const displayMovies = movies.getAll();

// Route path for home page. renders home.handlebars in the response, along with dynamic content from the exported data getter method
app.get('/', (req, res) => {
    res.type('text/html');
    res.render('home', {movies: displayMovies});
});

// Route path for detail page. Renders detail.handlebars, with the movie title passed in the query. dynamic content is passed including the title in the query, and the getDetail method with the title in the query as a parameter
app.get('/detail', (req, res) => {
    const movietitle = req.query.title
    res.render('detail', {title: movietitle, stats: movies.getDetail(movietitle)});
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
    res.send('404 - Not Found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});