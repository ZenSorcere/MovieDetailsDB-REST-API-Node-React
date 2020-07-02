const movies = [
    {title : 'Star Wars', dir: 'George Lucas', year: 1977, rating: 'PG'},
    {title: 'The Princess Bride', dir: 'Rob Reiner', year: 1987, rating: 'PG'},
    {title: 'Hook', dir: 'Steven Spielberg', year: 1991, rating: 'PG'},
    {title: 'Real Genius', dir: 'Martha Coolidge', year: 1985, rating: 'PG-13'},
    {title: 'Transformers', dir: 'Nelson Shin', year: 1986, rating: 'PG'}
];

/* const getAll = movies.forEach((movie) => {
    console.log(movie.title + ': \n  ' + movie.dir + '\n  ' + movie.year + '\n  ' + movie.rating)
}); */

/* const getAll = (() => {
    movies.forEach((movie) => {
        return movie.title + ': \n  ' + movie.dir + '\n  ' + movie.year + '\n  ' + movie.rating;
    });
}); */

//console.log(getAll);

const getAll = movies.forEach((movie) => {
    console.log(movie.title + ': ' + movie.dir + ', ' + movie.year + ', ' + movie.rating); 
});

//console.log(movies.length);

module.exports = movies;

