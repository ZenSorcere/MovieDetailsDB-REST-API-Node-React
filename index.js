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
/*---------------------------------------------------------------
    IT 122 - Week5 Assignment
    REST APIs
    --Provide API routes for each of the methods exported by the data module:
        --get a single item
        --get all items
        --delete an item
        add or update an item(new route)
    --Each API should:
        --support cross-origin acess
        --accept necessary query parameters or request body
        --return appropirate JSON data on success
        --return an error status code and message is something went wrong

    Updated By: Mike Gilson
    Date: 07/31/2020
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
app.use(bodyParser.json());

// set Access-Control-Allow-Origin header for api routes
app.use('/api', require('cors')());



// Route path for home page. Renders home.handlebars and finds all movies documents from collection, and renders them into the handlebars template.
// Updated(8/7/20): adjusted res.render to send a handelbars template for React. 
app.get('/', (req, res, next) => {
    return movies.find({}).lean()
        .then((movies) => {
            //res.render('home', { movies });
            res.render('home-react', {movies: JSON.stringify(movies)});
        })
        .catch(err => next(err));
})

// GET ALL - API
/* 
Get API route for all items. References movies model and returns all movies in JSON format. Returns 500 Status error if movies cannot be retrieved.
*/
app.get('/api/movies', (req, res) => {
    return movies.find({})
    .then((movies) => {
        res.json(movies)
    })
    // eslint-disable-next-line no-unused-vars
    .catch(err => {
        res.status(500).send('Error occurred: dabatase error')})
})

// Route path for detail page. Renders detail.handlebars, with the movie title passed in the query. Mongodb collection is accessed, finds the document with the provided title, and returns the information.
app.get('/detail', (req, res) => {
    const movietitle = req.query.title;
    movies.findOne({title: movietitle}).lean()
    .then((movies) => {
        res.render('detail', {title: movietitle, stats: movies});
    });
});

// GET SINGLE ITEM - API
/*
Get API route for a single item, provided in url params. If movie title not found, returns 400 error saying desired movie wasn't found. Else, movie info is returned in JSON format. Returns 500 Status error if movies cannot be retrieved. 
*/
app.get('/api/movies/:title', (req, res) => {
    const movietitle = req.params.title; 
    movies.findOne({title: movietitle})
    .then((movie) => {
        if (movie === null) {
            return res.status(400).send(`Error: "${movietitle}" not found`)
        } else {
        res.json(movie)
        }
    })
    .catch(err => {
        res.status(500).send('Error occurred: dabatase error', err)
    })
    })


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

// DELETE SINGLE ITEM - API
/*
Delete API route for a single movie item, provided in url params. If requested movie is not in db, returns 400 error saying desired movie wasn't found. Else, removed movie info is returned in JSON format. Returns 500 Status error if movies cannot be retrieved.
*/
app.get('/api/movies/delete/:title', (req, res) => {
    const movietitle = req.params.title; 
    movies.findOneAndDelete({title: movietitle})
    .then(movie => {
        if(movie === null) {
            return res.status(400).send(`Error: "${movietitle}" not found`)   
        } else {
            res.json(movie)}
    })

    .catch(err => {
        res.status(500).send('Error occurred: dabatase error', err)
    })
})

// UPDATE/ADD SINGLE ITEM - API
/*
Post API route for adding a single movie item or updating existing movie, provided in url params. Creates a new movie in the db if no documents match the provided title url parameter. If there is a match, will update with info passed in the body, and won't create a duplicate. Returns the updated movie document in JSON format. Otherwise, Returns 500 Status error if movies cannot be retrieved.
*/
app.post('/api/movies/add', (req, res) => {
    //const movietitle = req.params.title;
    //const userID = req.params._id;
    //movies.findByIdAndUpdate({title: movietitle}, req.body, {upsert: true, new: true})

    //**may need to remove the id with his ''?**
    // 
    delete req.body["_id"];
    //'title: req.body.title' as alt to "movietitle"
    //movies.findOneAndUpdate({title: req.body.title}, req.body, {upsert: true, new: true})

//changing to "{_id: req.body._id}" while removing delete id above was able to save edits to existing titles, but new items were then getting null ids. hmph.
    movies.updateOne({title: req.body.title}, req.body, {upsert: true, new: true})
    .then(movie => {
        res.json(movie) 
    })
    .catch((err) => console.log(err))
    //.catch(err => { 
    //    res.status(500).send('Error occurred: dabatase error', err)
    //})
})


    
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



