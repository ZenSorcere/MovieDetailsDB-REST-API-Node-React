/*  IT 122 - ADV JS - Week1 Assignment
    Node.js up and running
    --data.js -  containing an array of at least 5 items (objects),
      where each item has at least 4 attributes and an exported getAll
      method that returns all array items.
    Created By: Mike Gilson
    Date: 07/02/2020
*/

// Create array of 5 objects with 4 attributes each
const movies = [
    {title : 'Star Wars', dir: 'George Lucas', year: 1977, rating: 'PG'},
    {title: 'The Princess Bride', dir: 'Rob Reiner', year: 1987, rating: 'PG'},
    {title: 'Hook', dir: 'Steven Spielberg', year: 1991, rating: 'PG'},
    {title: 'Real Genius', dir: 'Martha Coolidge', year: 1985, rating: 'PG-13'},
    {title: 'Transformers', dir: 'Nelson Shin', year: 1986, rating: 'PG'}
];

// Export getter method for the array
exports.getAll = () => {
    return movies;
}

// Export getDetails method with a parameter of title. Uses find feature to look through movie array objects and find the title that matches the parameter, and return that movie object.
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find - "Find an object in an array by one of its properties"
exports.getDetail = title => {
    const movie = movies.find(movies => movies.title === title);
    return movie;
}
// NOTE: After many tweaks and guessing attempts, I managed to get it to work, though I'm not certain I understand *how*. Just being honest.

// Add Movie Object to movies array
exports.addMovie = (title, dir, year, rating) => {
    
    if ([title, dir, year, rating].includes(undefined)) {
        return console.log(`failed to add "${title}" -- incomplete info`);
    } else {
        const newMovie = {
            title: title,
            dir: dir,
            year: year,
            rating: rating
        };
        movies.push(newMovie);
        console.log(`"${title}" added`);
        return newMovie;
    }
    
};

// Delete Movie Object from movies array
exports.delMovie = title => {
    const delMovie = movies.findIndex(movies => movies.title === title);
    if (delMovie === -1) {
        console.log(`"${title}" doesn't exist`);
    } else {
    //console.log(title + " " + delMovie);
    movies.splice(delMovie,1);
    //console.log(exports.getAll());
    console.log(`"${title}" removed`);
    return movies;
    }
};


// Sample console tests to confirm methods worked
/*
console.log(exports.getAll()); //see starting array
console.log(exports.getDetail("Hook")); //see specific item
console.log(exports.getDetail("groupie"));
exports.addMovie("Fake Film", "Alan Smithee", 1980, "PG"); //add item to end of array
exports.addMovie("gattaca");
console.log(exports.getAll()); //see array with added item
exports.delMovie("Hook"); //remove item from middle of array
exports.delMovie("starwars");
console.log(exports.getAll()); //see array sans removed item
*/
