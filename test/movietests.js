const expect = require("chai").expect;
const movies = require("../data");

const displayMovies = movies.getAll();

describe("Movie module", () => {
// Get Item Tests
    it("Returns requested movie", () => {
        const result = movies.getDetail("Hook");
        expect(result).to.deep.equal({title: 'Hook', dir: 'Steven Spielberg', year: 1991, rating: 'PG'});
    });

    it("Fails to return - invalid movie", () => {
        const result = movies.getDetail("Argo");
        expect(result).to.be.undefined;
    });
// Add Item Tests
    it("Adds requested movie", () => {
        
        movies.addMovie("Fake Film", "Alan Smithee", 1980, "PG"); 
        expect(displayMovies).to.deep.include({ title: 'Fake Film', dir: 'Alan Smithee', year: 1980, rating: 'PG' });
    });

    it("Fails to add due to missing params", () => {
        movies.addMovie("Gattaca", "Someone");  
        expect(displayMovies).to.not.include({ title: 'Gattaca', dir: 'Someone', year: undefined, rating: undefined });
    });
// Delete Item Tests
    it("Deletes requested movie", () => {
        //const target = { title: 'Star Wars', dir: 'George Lucas', year: 1977, rating: 'PG' };
        movies.delMovie("Star Wars");
        //expect(movies.getDetail("Star Wars")).to.be.undefined;
        expect(displayMovies).to.not.include({ title: 'Star Wars', dir: 'George Lucas', year: 1977, rating: 'PG' });
    });

    it("Delete failed due to title mismatch", () => {
        //const addMovie = movies.addMovie("Star Wars", "George Lucas", 1977, "PG");
        movies.delMovie("real genius");
        // Confirm intended movie still exists
        expect(movies.getDetail("Real Genius")).to.deep.equal({ title: 'Real Genius', dir: 'Martha Coolidge', year: 1985, rating: 'PG-13' });
        // Confirm entered title does not exist
        expect(movies.getDetail("real genius")).to.be.undefined;
    })

    


});

