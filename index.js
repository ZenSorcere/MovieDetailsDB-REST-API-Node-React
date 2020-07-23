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
---------------------------------------------------------------
    IT 122 - Week4 Assignment
    Database Integration
    --Update home and detail routes to use new eb instead of data.js file, and detail page should display details of the requested item
    --Create a new server route to 'delete' an item from your database on request. Your route should accept a request query parameter identifying the item to delete, and should return a response indicating whether delete succeeded or failed

    Updated By: Mike Gilson
    Date: 07/22/2020
*/


// Create variables for required modules for http and data.js
// Define app as Express instance with configuration
const express = require("express");
const bodyParser = require("body-parser");

// Creates variable for movies model
const movies = require("./models/movies");

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


// Route path for home page. Renders home.handlebars and finds all movies documents from collection, and renders them into the handlebars template.
app.get('/', (req, res, next) => {
    return movies.find({}).lean()
        .then((movies) => {
            res.render('home', { movies });
        })
        .catch(err => next(err));
})


// Route path for detail page. Renders detail.handlebars, with the movie title passed in the query. Mongodb collection is accessed, finds the document with the provided title, and returns the information.
app.get('/detail', (req, res) => {
    const movietitle = req.query.title;
    movies.findOne({title: movietitle}).lean()
    .then((movies) => {
        res.render('detail', {title: movietitle, stats: movies});
    });
});

// Route path for delete, with movie title passed in the query. Mongdb collection accessed, and findOneAndDelete is run with the provided movie title. Function runs to determine if movie title doesn't exist and returns failure to delete message, and if movie is found, deletes and confirms deletion. 
app.get('/delete', (req, res) => {
    const movietitle = req.query.title;
    movies.findOneAndDelete({title: movietitle}, (err, movie) => {
        //console.log(movie);
        if (err) {
            console.log(err);
        } else if (!movie) {
            console.log(movietitle + " not found");
            res.send(`${movietitle} not found`);
        } else if (movie) {
            console.log(movietitle + " delete successful");
            res.send(`${movietitle} delete successful`);
        }
    });
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