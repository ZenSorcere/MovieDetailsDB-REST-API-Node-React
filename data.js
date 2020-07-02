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