const http = require("http");

const movies = require("./data"); //.default;

let displayMovies = movies.getAll();

http.createServer(function (req, res) {
    const path = req.url.toLowerCase();
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Home page\n'+ 'Array length: '+ displayMovies.length);
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page\n This is Mike\'s About Page. He is learning node.js this quarter, which is an interesting challenge.\n Expect much stress baking to result!');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Error - Page Not found');
            break;
    }
}).listen(process.env.PORT || 3000);