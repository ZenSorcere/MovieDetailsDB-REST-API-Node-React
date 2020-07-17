/*  IT 122 - ADV JS - Week3 Assignment
    Adding Tests with Mocha/Chai
    --create 6 tests, success and failure, for the 3 data methods

    Created By: Mike Gilson
    Date: 07/17/2020
*/

// Required modules
const expect = require("chai").expect;
const movies = require("../data");

const displayMovies = movies.getAll();

describe("Movie module", () => {
// Get Item Tests
    it("Returns requested movie", () => {
        const result = movies.getDetail("Hook");
        //expect result to match provided output
        expect(result).to.deep.equal({title: 'Hook', dir: 'Steven Spielberg', year: 1991, rating: 'PG'});
    });

    it("Fails to return - invalid movie", () => {
        const result = movies.getDetail("Argo");
        //expect return msg to match provided output
        expect(result.msg).to.deep.equal('"Argo" not found');
    });
// Add Item Tests
    it("Adds requested movie", () => { 
        movies.addMovie("Fake Film", "Alan Smithee", 1980, "PG");
        //expect updated array to include addition
        expect(displayMovies).to.deep.include({ title: 'Fake Film', dir: 'Alan Smithee', year: 1980, rating: 'PG' });
    });

    it("Fails to add due to missing params", () => {
        movies.addMovie("Gattaca", "Someone");
        //expect array to not include incomplete entry  
        expect(displayMovies).to.not.include({ title: 'Gattaca', dir: 'Someone', year: undefined, rating: undefined });
        //expect return msg to match provided output
        expect (movies.addMovie("Gattaca", "Someone").msg).to.deep.equal('incomplete info');
    });
// Delete Item Tests
    it("Deletes requested movie", () => {
        movies.delMovie("Star Wars");
        //expect updated array to not include deleted item
        expect(displayMovies).to.not.include({ title: 'Star Wars', dir: 'George Lucas', year: 1977, rating: 'PG' });
    });

    it("Delete failed due to title mismatch", () => {
        movies.delMovie("real genius");
        // Confirm entered title does not exist, and return msg matches provided output
        expect(movies.getDetail("real genius").msg).to.deep.equal('"real genius" not found');
    })

    


});

