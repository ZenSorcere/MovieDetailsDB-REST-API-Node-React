/*  IT 122 - ADV JS - Week3 Assignment
    Additional methods for add/delete
    --create additional methods for adding and deleting array items
    --return info on success/failure of each method
    Updated By: Mike Gilson
    Updated Date: 07/14/2020
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

// getDetail method created for Week2 Asmt
// Export getDetails method with a parameter of title. Uses find feature to look through movie array objects and find the title that matches the parameter, and return that movie object.
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find - "Find an object in an array by one of its properties"
exports.getDetail = title => {
    const movie = movies.find(movies => movies.title === title);
    if (movie === undefined) {
        return {"details": false, "msg": `"${title}" not found`}
    } else {
    return movie;
    }
}


// Add Movie Object to movies array with 4 params
exports.addMovie = (title, dir, year, rating) => { 
    //if any req params are undefined, movie not added and msg returned   
    if ([title, dir, year, rating].includes(undefined)) {
        return {"added": false, "msg": "incomplete info"};
    } else {
        //otherwise, new movie object created and pushed to array
        const newMovie = {
            title: title,
            dir: dir,
            year: year,
            rating: rating
        };
        movies.push(newMovie);
        return newMovie;
        //return {"added": true, "msg": `"${title}" added`}
    }
    
};

// Delete Movie Object from movies array
exports.delMovie = title => {
    //find movie index in array by title
    const delMovie = movies.findIndex(movies => movies.title === title);
    // if index comes up as -1, movie is not in index, nothing is deleted
    if (delMovie === -1) {
        return {"deleted": false, "msg": `"${title}" doesn't exist`}
    } else {
        // array spliced at index found, and removed from array, and msg returned
        movies.splice(delMovie,1);
        return {"deleted": true, "msg": `"${title}" removed` }
    }
};


// Sample console tests to confirm methods worked
/*
console.log(exports.getAll()); //see starting array

exports.getDetail("Hook"); //see specific item

exports.getDetail("groupie");

exports.addMovie("Fake Film", "Alan Smithee", 1980, "PG"); //add item to end of array
exports.addMovie("gattaca");
console.log(exports.getAll()); //see array with added item

exports.delMovie("Hook"); //remove item from middle of array

exports.delMovie("starwars");

console.log(exports.getAll()); //see array sans removed item
*/
